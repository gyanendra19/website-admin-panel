import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const RetailStreamline = ({data}) => {
    const [retailStreamline, setRetailStreamline] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/retailPage/retailStreamline'), (snapshot) => {
            if(snapshot !== null){
                setRetailStreamline(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'title' && setRetailStreamline(prev => ({...prev, title: update}))
        selector === 'image' && setRetailStreamline(prev => ({...prev, image: update}))
        selector === 'para1' && setRetailStreamline(prev => ({...prev, para1: update}))
        selector === 'para2' && setRetailStreamline(prev => ({...prev, para2: update}))
        selector === 'bg' && setRetailStreamline(prev => ({...prev, bg: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/retailPage/retailStreamline'), retailAi);
        success = true
        if(success) alert('Date Changed')
    }



  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Retail Streamline Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
        <div className={`${showSection ? '' : 'hidden'}`}>
        {Object.keys(retailStreamline).length !== 0 && Object.keys(retailStreamline || {}).map(key => (
                <>
                    {Object.keys(retailStreamline).length !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={retailStreamline[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={retailStreamline[key]} alt="" />
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

export default RetailStreamline 