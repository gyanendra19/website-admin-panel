import { RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'

const HomeSolutionSec = ({ data }) => {
    const [showSection, setShowSection] = useState(false)
    const [solutionData, setSolutionData] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/homePage/solution'), (snapshot) => {
            if (snapshot !== null) {
                setSolutionData(snapshot.val())
            }
        })
    }, [])

    const updateText = (update, selector) => {
        selector === data && setSolutionData(prev => ({...prev, key: update}))
        selector === 'image2' && setSolutionData(prev => ({...prev, image2: update}))
        selector === 'image3' && setSolutionData(prev => ({...prev, image3: update}))
        selector === 'solPara1' && setSolutionData(prev => ({...prev, solPara1: update}))
        selector === 'solPara2' && setSolutionData(prev => ({...prev, solPara2: update}))
        selector === 'solPara3' && setSolutionData(prev => ({...prev, solPara3: update}))
        selector === 'solHead1' && setSolutionData(prev => ({...prev, solHead1: update}))
        selector === 'solHead2' && setSolutionData(prev => ({...prev, solHead2: update}))
        selector === 'solHead3' && setSolutionData(prev => ({...prev, solHead3: update}))
        selector === 'title' && setSolutionData(prev => ({...prev, title: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/homePage/solution'), solutionData);
        success = true
        if(success) alert('Date Changed')
    }

    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Solution Section <span><RiArrowRightSLine /></span></h1>
            <div className={`${showSection ? '' : 'hidden'}`}>
                {Object.keys(solutionData || {}) !== 0 && Object.keys(solutionData || {}).map(key => (
                    <>
                        {Object.keys(data) !== 0 && (
                            <div className={`flex flex-col gap-1`}>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                    <input
                                        onChange={(e) => updateText(e.target.value, key)}
                                        className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                        type="text"
                                        id={key}
                                        value={solutionData[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={solutionData[key]} alt="" />
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

export default HomeSolutionSec