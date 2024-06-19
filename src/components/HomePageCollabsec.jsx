import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowRightSLine } from '@remixicon/react'

const HomePageCollab = () => {
    const [showSection, setShowSection] = useState(false)
    const [homeCollab, setHomeCollab] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/homePage/homePageCollab'), (snapshot) => {
            if(snapshot !== null){
                setHomeCollab(snapshot.val())
            }
        })
    }, [])

    const updateText = (update, selector) => {
        selector === 'image' && setHomeCollab(prev => ({...prev, image: update}))
        selector === 'para1' && setHomeCollab(prev => ({...prev, para1: update}))
        selector === 'para2' && setHomeCollab(prev => ({...prev, para2: update}))
        selector === 'title' && setHomeCollab(prev => ({...prev, title: update}))
    }


    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/homePage/homePageCollab'), homeCollab   );
        success = true
        if(success) alert('Date Changed')
    }

  return (
    <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Collab Section <span><RiArrowRightSLine /></span></h1>
            <div className={`${showSection ? '' : 'hidden'}`}>
            {Object.keys(homeCollab  || {}) !== 0 && Object.keys(homeCollab  || {}).map(key => (
                <>
                    {Object.keys(homeCollab) !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={homeCollab[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={homeCollab[key]} alt="" />
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

export default HomePageCollab