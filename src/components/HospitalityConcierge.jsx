import { onValue, ref } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const HospitalityConcierge = () => {
    const [showSection, setShowSection] = useState(false)
    const [hospitalityConcierge, setHospitalityConcierge] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/users/A Hospitality Concierge'), (snapshot) => {
            if (snapshot !== null) {
                setHospitalityConcierge(snapshot.val())
            }
        })
    }, [])
    console.log(hospitalityConcierge);


    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-semibold flex gap-1 items-center'>Users from Hospitality Concierge <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            {Object.keys(hospitalityConcierge || {}) !== 0 && Object.keys(hospitalityConcierge || {}).map(user => (
                <>
                    <h1 className={`text-xl font-medium ${showSection ? 'bg-amber-400 px-2 py-1 rounded-md w-fit' : ''}`}>{user}</h1>
                    {Object.keys(hospitalityConcierge[user]).map(key => (
                        <>
                            {Object.keys(hospitalityConcierge) !== 0 && (
                                <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                        <input
                                            // onChange={(e) => updateText(e.target.value, 'landing-title')}
                                            className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                            type="text"
                                            id={key}
                                            value={hospitalityConcierge[user][key] || ''} />
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </>
            ))}
        </Fragment>
    )
}

export default HospitalityConcierge