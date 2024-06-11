import { onValue, ref } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowRightSLine } from '@remixicon/react'

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

    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Goal Section <span><RiArrowRightSLine /></span></h1>
            {Object.keys(homeGoal || {}) !== 0 && Object.keys(homeGoal || {}).map(key => (
                <>

                    <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-2'>
                            <label className='font-medium' htmlFor={key}>{key}</label>
                            <input
                                // onChange={(e) => updateText(e.target.value, 'landing-title')}
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
        </Fragment>
    )
}

export default HomePageGoal