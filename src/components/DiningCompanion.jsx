import { onValue, ref } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const DiningCompanion = () => {
    const [showSection, setShowSection] = useState(false)
    const [diningCompanion, setDiningCompanion] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/users/A Dining Companion'), (snapshot) => {
            if (snapshot !== null) {
                setDiningCompanion(snapshot.val())
            }
        })
    }, [])


    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-semibold flex gap-1 items-center'>Users from Dining Companion <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            {Object.keys(diningCompanion || {}) !== 0 && Object.keys(diningCompanion || {}).map(user => (
                <>
                    <h1 className={`text-xl font-medium ${showSection ? 'bg-amber-400 px-2 py-1 rounded-md w-fit' : ''}`}>{user}</h1>
                    {Object.keys(diningCompanion[user]).map(key => (
                        <>
                            {Object.keys(diningCompanion) !== 0 && (
                                <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                        <input
                                            // onChange={(e) => updateText(e.target.value, 'landing-title')}
                                            className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                            type="text"
                                            id={key}
                                            value={diningCompanion[user][key] || ''} />
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

export default DiningCompanion