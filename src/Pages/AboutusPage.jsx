import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const AboutPage = () => {
    const [about, setAbout] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/aboutUsPage'), (snapshot) => {
            if(snapshot !== null){
                setAbout(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'title' && setAbout(prev => ({...prev, title: update}))
        selector === 'image' && setAbout(prev => ({...prev, image: update}))
        selector === 'para1' && setAbout(prev => ({...prev, para1: update}))
        selector === 'para2' && setAbout(prev => ({...prev, para2: update}))
        selector === 'bg' && setAbout(prev => ({...prev, bg: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/aboutUsPage'), about);
        success = true
        if(success) alert('Date Changed')
    }

    return (
        <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
                <Fragment>
                    <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>About us Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
                    <div className={`${showSection ? '' : 'hidden'}`}>
                        {Object.keys(about).length !== 0 && Object.keys(about || {}).map(key => (
                            <>
                                {Object.keys(about).length !== 0 && (
                                    <div className={`flex flex-col gap-1`}>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                            <input
                                                onChange={(e) => updateText(e.target.value, key)}
                                                className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                                type="text"
                                                id={key}
                                                value={about[key] || ''} />
                                            {key.startsWith('image') || key.startsWith('bg') && (
                                                <img className='w-44' src={about[key]} alt="" />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                        <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => writeUserData()}>Change</button>
                    </div>
                </Fragment>
            </div>
        </section>
    )
}

export default AboutPage