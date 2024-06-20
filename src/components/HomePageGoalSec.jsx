import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const HomePageGoal = () => {
    const [showSection, setShowSection] = useState(false)
    const [homeGoal, setHomeGoal] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/homePage/homePageGoal'), (snapshot) => {
            if (snapshot !== null) {
                setHomeGoal(snapshot.val())
            }
        })
    }, [])

    const updateText = (update, selector) => {
        selector === 'bg' && setHomeGoal(prev => ({...prev, bg: update}))
        selector === 'image' && setHomeGoal(prev => ({...prev, image: update}))
        selector === 'para1' && setHomeGoal(prev => ({...prev, para1: update}))
        selector === 'para2' && setHomeGoal(prev => ({...prev, para2: update}))
        selector === 'para3' && setHomeGoal(prev => ({...prev, para3: update}))
        selector === 'title' && setHomeGoal(prev => ({...prev, title: update}))
    }


    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/homePage/homePageGoal'), homeGoal);
        success = true
        if(success) alert('Date Changed')
    }

    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Goal Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            <div className={`${showSection ? '' : 'hidden'}`}>
            {Object.keys(homeGoal || {}) !== 0 && Object.keys(homeGoal || {}).map(key => (
                <>
                    <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-2'>
                            <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                            <input
                                onChange={(e) => updateText(e.target.value, key)}
                                className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                type="text"
                                id={key}
                                value={homeGoal[key] || ''} />
                            {key.startsWith('image') && (
                                <img className='w-44' src={homeGoal[key]} alt="" />
                            )}
                        </div>
                    </div>
                </>
            ))}
            <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => writeUserData()}>Change</button>
            </div>
        </Fragment>
    )
}

export default HomePageGoal