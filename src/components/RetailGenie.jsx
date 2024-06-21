import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const RetailGenie = ({ data }) => {
    const [retailGenie, setRetailGenie] = useState([])
    const [showSection, setShowSection] = useState(false)


    useEffect(() => {
        onValue(ref(database, 'data/retailPage/genieBox'), (snapshot) => {
            if (snapshot !== null) {
                setRetailGenie(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector, id) => {
        selector === 'head' && setRetailGenie(prev => prev.map(genie => genie.id === id ? ({...genie, head: update}) : genie))
        selector === 'image' && setRetailGenie(prev => prev.map(genie => genie.id === id ? ({...genie, image: update}) : genie))
        selector === 'para' && setRetailGenie(prev => prev.map(genie => genie.id === id ? ({...genie, para: update}) : genie))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/retailPage/genieBox'), retailGenie);
        success = true
        if (success) alert('Date Changed')
    }


    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Retail Genie Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            <div className={`${showSection ? '' : 'hidden'}`}>
                {retailGenie?.length !== 0 && retailGenie.map((genie) => (
                    <>
                        {Object.keys(genie).length !== 0 && Object.keys(genie).map(key => (
                                <div className={`flex flex-col gap-1`}>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-medium mt-3' htmlFor={key}>{key}</label>
                                        <input
                                            onChange={(e) => updateText(e.target.value, key, genie.id)}
                                            className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                            type="text"
                                            id={key}
                                            value={genie[key] || ''} />
                                        {key.startsWith('image') && (
                                            <img className='w-44' src={genie[key]} alt="" />
                                        )}
                                    </div>
                                </div> 
                        ))}
                <button className='mt-4 px-3 py-1 bg-blue-400 rounded-md font-medium' onClick={() => writeUserData()}>Change</button>
                    </>
                ))}
            </div>
        </Fragment>
    )
}

export default RetailGenie