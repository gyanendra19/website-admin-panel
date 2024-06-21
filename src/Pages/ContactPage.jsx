import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const ContactPage = () => {
    const [contact, setContact] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/contactPage'), (snapshot) => {
            if(snapshot !== null){
                setContact(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'title' && setContact(prev => ({...prev, title: update}))
        selector === 'subtitle' && setContact(prev => ({...prev, subtitle: update}))
        selector === 'para' && setContact(prev => ({...prev, para: update}))
        selector === 'bg' && setContact(prev => ({...prev, bg: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/contactPage'), contact);
        success = true
        if(success) alert('Date Changed')
    }

    return (
        <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
                <Fragment>
                    <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Contact Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
                    <div className={`${showSection ? '' : 'hidden'}`}>
                        {Object.keys(contact).length !== 0 && Object.keys(contact || {}).map(key => (
                            <>
                                {Object.keys(contact).length !== 0 && (
                                    <div className={`flex flex-col gap-1`}>
                                        <div className='flex flex-col gap-2'>
                                            <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                            <input
                                                onChange={(e) => updateText(e.target.value, key)}
                                                className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                                type="text"
                                                id={key}
                                                value={contact[key] || ''} />
                                            {key.startsWith('image') || key.startsWith('bg') && (
                                                <img className='w-44' src={contact[key]} alt="" />
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

export default ContactPage