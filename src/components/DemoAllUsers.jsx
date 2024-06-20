import { onValue, ref } from 'firebase/database'
import React, { Fragment, useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'

const DemoAllUsers = () => {
    const [showSection, setShowSection] = useState(false)
    const [demoAllUsers, setDemoAllUsers] = useState({})

    useEffect(() => {
        onValue(ref(database, 'data/users/demo'), (snapshot) => {
            if (snapshot !== null) {
                setDemoAllUsers(snapshot.val())
            }
        })
    }, [])


    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-semibold flex gap-1 items-center'>Users from Demo <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            {Object.keys(demoAllUsers || {}) !== 0 && Object.keys(demoAllUsers || {}).map(user => (
                <>
                    <h1 className='text-xl font-medium'>{user}</h1>
                    {console.log(user)}
                    {Object.keys(demoAllUsers[user]).map(key => (
                        <>
                            {Object.keys(demoAllUsers) !== 0 && (
                                <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-medium' htmlFor={key}>{key}</label>
                                        <input
                                            // onChange={(e) => updateText(e.target.value, 'landing-title')}
                                            className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                            type="text"
                                            id={key}
                                            value={demoAllUsers[user][key] || ''} />
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

export default DemoAllUsers