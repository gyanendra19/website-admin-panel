import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const RetailPageAi = ({data}) => {
    const [retailAi, setRetailAi] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/retailPage/geniePageAi'), (snapshot) => {
            if(snapshot !== null){
                setRetailAi(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'title' && setRetailAi(prev => ({...prev, title: update}))
        selector === 'image' && setRetailAi(prev => ({...prev, image: update}))
        selector === 'para1' && setRetailAi(prev => ({...prev, para1: update}))
        selector === 'bg' && setRetailAi(prev => ({...prev, bg: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/retailPage/geniePageAi'), retailAi);
        success = true
        if(success) alert('Date Changed')
    }



  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Retail AI Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
        <div className={`${showSection ? '' : 'hidden'}`}>
        {Object.keys(retailAi).length !== 0 && Object.keys(retailAi || {}).map(key => (
                <>
                    {Object.keys(retailAi).length !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={retailAi[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={retailAi[key]} alt="" />
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

export default RetailPageAi