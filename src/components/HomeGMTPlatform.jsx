import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const HomeGMTPlatform = () => {
    const [showSection, setShowSection] = useState(false)
    const [GMTPlatform, setGMTPlatform] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/homePage/GMTPlatform'), (snapshot) => {
            if(snapshot !== null){
                setGMTPlatform(snapshot.val())
            }
        })
    }, [])

    const updateText = (update, selector) => {
        selector === 'bg' && setGMTPlatform(prev => ({...prev, bg: update}))
        selector === 'image' && setGMTPlatform(prev => ({...prev, image: update}))
        selector === 'para1' && setGMTPlatform(prev => ({...prev, para1: update}))
        selector === 'para2' && setGMTPlatform(prev => ({...prev, para2: update}))
        selector === 'title' && setGMTPlatform(prev => ({...prev, title: update}))
    }


    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/homePage/GMTPlatform'), GMTPlatform);
        success = true
        if(success) alert('Date Changed')
    }

  return (
    <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>GMTPlatform Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            <div className={`${showSection ? '' : 'hidden'}`}>
            {Object.keys(GMTPlatform  || {}) !== 0 && Object.keys(GMTPlatform  || {}).map(key => (
                <>
                    {Object.keys(GMTPlatform) !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={GMTPlatform[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={GMTPlatform[key]} alt="" />
                                    )}
                            </div>
                        </div>
                    )}
                </>
            ))}
            <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => writeUserData()}>Change</button>
            </div>
        </Fragment>
  )
}

export default HomeGMTPlatform