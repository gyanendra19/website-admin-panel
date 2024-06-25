import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const HomeLandingSec = ({data}) => {
    const [main, setMain] = useState({})
    const [showSection, setShowSection] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'data/homePage/main'), (snapshot) => {
            if(snapshot !== null){
                setMain(snapshot.val())
            }
        })
    }, [])

    // useEffect(() => {
    //     setLandingImage(main?.image)
    //     setLandingTitle(main?.title)
    //     setLandingPara(main?.para)
    // }, [main])

    // console.log(landingImage, landingPara, landingTitle, main);

    const updateText = (update, selector) => {
        selector === 'title' && setMain(prev => ({...prev, title: update}))
        selector === 'image' && setMain(prev => ({...prev, image: update}))
        selector === 'para' && setMain(prev => ({...prev, para: update}))
        selector === 'bg' && setMain(prev => ({...prev, bg: update}))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/homePage/main'), main);
        success = true
        if(success) alert('Date Changed')
    }



  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Landing Section <span>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
        <div className={`${showSection ? '' : 'hidden'}`}>
        {Object.keys(main).length !== 0 && Object.keys(main).map(key => (
                <>
                    {Object.keys(main).length !== 0 && (
                        <div className={`flex flex-col gap-1`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium mt-2' htmlFor={key}>{key}</label>
                                <input
                                    onChange={(e) => updateText(e.target.value, key)}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={main[key] || ''} />
                                    {key.startsWith('image') || key.startsWith('bg') && (
                                        <img className='w-44' src={main[key]} alt="" />
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

export default HomeLandingSec