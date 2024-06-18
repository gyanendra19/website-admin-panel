import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const RetailAssistant = ({data}) => {
    const [retailAssistant, setRetailAssistant] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/retailPage/retailAssistant'), (snapshot) => {
            if(snapshot !== null){
                setRetailAssistant(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'title' && setRetailAssistant(prev => ({...prev, title: update}))
        selector === 'image' && setRetailAssistant(prev => ({...prev, image: update}))
        selector === 'para1' && setRetailAssistant(prev => ({...prev, para1: update}))
        selector === 'para2' && setRetailAssistant(prev => ({...prev, para2: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/retailPage/retailAssistant'), retailAssistant);
        success = true
        if(success) alert('Date Changed')
    }



  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Retail Assistant Section <span><RiArrowRightSLine /></span></h1>
        <div className={`${showSection ? '' : 'hidden'}`}>
        {Object.keys(retailAssistant).length !== 0 && Object.keys(retailAssistant || {}).map(key => (
                <>
                    {Object.keys(retailAssistant).length !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={retailAssistant[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={retailAssistant[key]} alt="" />
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

export default RetailAssistant