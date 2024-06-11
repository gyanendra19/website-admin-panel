import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref } from 'firebase/database'
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

    // const updateText = (update, selector) => {
    //     selector === 'landing-title' && setLandingTitle(update)
    //     selector === 'landing-image' && setLandingImage(update)
    //     selector === 'para-1' && setLandingPara(update)
    // }


  return (
    <Fragment>
        <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>Landing Section <span><RiArrowRightSLine /></span></h1>
        {Object.keys(main  || {}) !== 0 && Object.keys(main  || {}).map(key => (
                <>
                    {Object.keys(main) !== 0 && (
                        <div className={`flex flex-col gap-1 ${showSection ? '' : 'hidden'}`}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-medium' htmlFor={key}>{key}</label>
                                <input
                                    // onChange={(e) => updateText(e.target.value, 'landing-title')}
                                    className='w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none'
                                    type="text"
                                    id={key}
                                    value={main[key] || ''} />
                                    {key.startsWith('image') && (
                                        <img className='w-44' src={main[key]} alt="" />
                                    )}
                            </div>
                        </div>
                    )}
                </>
            ))}
    </Fragment>
  )
}

export default HomeLandingSec