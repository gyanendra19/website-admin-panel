import { onValue, ref } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowRightSLine } from '@remixicon/react'

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

  return (
    <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>GMTPlatform Section <span><RiArrowRightSLine /></span></h1>
            {Object.keys(GMTPlatform  || {}) !== 0 && Object.keys(GMTPlatform  || {}).map(key => (
                <>
                    {Object.keys(GMTPlatform) !== 0 && (
                        <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium' htmlFor={key}>{key}</label>
                                <input
                                    // onChange={(e) => updateText(e.target.value, 'landing-title')}
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
        </Fragment>
  )
}

export default HomeGMTPlatform