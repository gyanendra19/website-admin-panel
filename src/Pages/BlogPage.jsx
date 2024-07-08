import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { v4 as uuidv4 } from 'uuid';
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const BlogPage = () => {
    const [blogs, setBlogs] = useState([])
    const [showSection, setShowSection] = useState(false)
    const [showAddBlog, setShowAddBlog] = useState(false)
    const [newBlog, setNewBlog] = useState({ id: uuidv4(), title: '', image: '', content: '' });
    const addBlogArr = ['title', 'image', 'content']
    const myUUID = uuidv4();

    useEffect(() => {
        onValue(ref(database, 'data/Blogs/allBlogs'), (snapshot) => {
            if (snapshot !== null) {
                setBlogs(snapshot.val())
            }
        })
    }, [])

    console.log(blogs);


    const updateText = (update, selector, id) => {
        selector === 'title' && setBlogs(prev => prev.map(blog => blog.id === id ? ({ ...blog, title: update }) : blog))
        selector === 'image' && setBlogs(prev => prev.map(blog => blog.id === id ? ({ ...blog, image: update }) : blog))
        selector === 'content' && setBlogs(prev => prev.map(blog => blog.id === id ? ({ ...blog, content: update }) : blog))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/Blogs/allBlogs'), blogs);
        success = true
        if (success) alert('Date Changed')
    }

    const handlenewBlog = (value, key) => {
        setNewBlog(prev => ({ ...prev, [key]: value }));
    }

    const handleAddBlog = () => {
        const newBlogWithId = { ...newBlog, id: uuidv4() };
        let success = false
        setBlogs(prev => {
            const updatedBlogs = [...prev, newBlogWithId]
            set(ref(database, 'data/Blogs/allBlogs'), updatedBlogs);
            return updatedBlogs
        })
        success = true
        if (success) alert('Blog Added')
        setNewBlog({ id: uuidv4(), title: '', image: '', content: '' });
    }


    return (
        <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
                <Fragment>
                    <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>All Blogs <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
                    <div className={`${showSection ? '' : 'hidden'}`}>
                        {blogs?.length !== 0 && blogs.map((blog) => (
                            <>
                                {Object.keys(blog).length !== 0 && Object.keys(blog).map(key => (
                                    <div className={`flex flex-col gap-1`}>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-medium mt-3' htmlFor={key}>{key}</label>
                                            <input
                                                onChange={(e) => updateText(e.target.value, key, blog.id)}
                                                className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                                type="text"
                                                id={key}
                                                value={blog[key] || ''} />
                                            {key.startsWith('image') && (
                                                <img className='w-44' src={blog[key]} alt="" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => writeUserData()}>Change</button>
                            </>
                        ))}
                    </div>
                    <button className='w-fit px-3 py-1 bg-green-400 rounded-md font-medium' onClick={() => setShowAddBlog(prev => !prev)}>{showAddBlog ? 'Do not add Blog' : 'Add Blog'}</button>
                    <div className={showAddBlog ? '' : 'hidden'}>
                        {addBlogArr.map(key => (
                            <div className={`flex flex-col gap-1`}>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-medium mt-3' htmlFor={key}>{key}</label>
                                    <input
                                        onChange={(e) => handlenewBlog(e.target.value, key)}
                                        className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                        type="text"
                                        id={key}
                                        value={newBlog[key]}
                                        />
                                </div>
                            </div>
                        ))}
                        <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => handleAddBlog()}>Add</button>
                    </div>
                </Fragment>
            </div>
        </section>
    )
}

export default BlogPage