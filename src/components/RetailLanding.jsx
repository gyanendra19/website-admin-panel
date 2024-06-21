import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const RetailLandingSec = ({data}) => {
    const [retailMain, setRetailMain] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/retailPage/retailPageHero'), (snapshot) => {
            if(snapshot !== null){
                setRetailMain(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector) => {
        selector === 'title' && setRetailMain(prev => ({...prev, title: update}))
        selector === 'image' && setRetailMain(prev => ({...prev, image: update}))
        selector === 'para' && setRetailMain(prev => ({...prev, para: update}))
        selector === 'bg' && setRetailMain(prev => ({...prev, bg: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/retailPage/retailPageHero'), retailMain);
        success = true
        if(success) alert('Date Changed')
    }


  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Retail Landing Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
        <div className={`${showSection ? '' : 'hidden'}`}>
        {Object.keys(retailMain  || {}) !== 0 && Object.keys(retailMain  || {}).map(key => (
                <>
                    {Object.keys(retailMain) !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={retailMain[key] || ''} />
                                    {key.startsWith('image') || key.startsWith('bg') && (
                                        <img className='w-44' src={retailMain[key]} alt="" />
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

export default RetailLandingSec