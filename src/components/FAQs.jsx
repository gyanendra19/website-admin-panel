import React, { Fragment, useEffect, useState } from 'react'
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConfig'


const FAQs = () => {
    const [faq, setFaq] = useState([])
    const [showSection, setShowSection] = useState(false)
    // const [faqID, setFaqID] = useState(null)

    useEffect(() => {
        onValue(ref(database, 'data/FAQPage/faqBox'), (snapshot) => {
            if (snapshot !== null) {
                setFaq(snapshot.val())
            }
        })
    }, [])


    const updateText = (update, selector, id) => {
        selector === 'ansPara1' && setFaq(prev => prev.map(faq => faq.id === id ? ({...faq, ansPara1: update}) : faq))
        selector === 'ansPara2' && setFaq(prev => prev.map(faq => faq.id === id ? ({...faq, ansPara2: update}) : faq))
        selector === 'question' && setFaq(prev => prev.map(faq => faq.id === id ? ({...faq, question: update}) : faq))
    }

    const writeUserData = () => {
        let success = false
        set(ref(database, 'data/FAQPage/faqBox'), faq);
        success = true
        if (success) alert('Date Changed')
    }
console.log(faq);

    return (
        <Fragment>
            <h1 onClick={() => setShowSection(prev => !prev)} className='text-xl font-medium flex gap-1 items-center'>FAQ's <span className='transition-all'>{showSection ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span></h1>
            <div className={`${showSection ? '' : 'hidden'} `}>
                {faq?.length !== 0 && faq.map((question) => (
                    <>
                        {Object.keys(question).length !== 0 && Object.keys(question).map(key => (
                                <div className={`flex flex-col gap-1 mb-2`}>
                                    <div className={`flex flex-col gap-2`}>
                                        <label className='font-medium mt-3' htmlFor={key}>{key}</label>
                                        <input
                                            onChange={(e) => updateText(e.target.value, key, question.id)}
                                            className={`w-[80%] border border-gray-200 rounded-sm px-3 h-[40px] focus:outline-none`}
                                            type="text"
                                            id={key}
                                            value={question[key] || ''} />
                                        {key.startsWith('image') && (
                                            <img className='w-44' src={question[key]} alt="" />
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

export default FAQs