import React from 'react'
import RetailLandingSec from './RetailLanding'
import RetailGenie from './RetailGenie'
import RetailAssistant from './RetailAssistant'
import RetailPageAi from './RetailPageAi'
import RetailStreamline from './RetailStreamline'

const RetailPage = () => {
    return (
        <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
                <RetailLandingSec />
                <RetailGenie />
                <RetailAssistant />
                <RetailPageAi />
                <RetailStreamline />
            </div>
        </section>
    )
}

export default RetailPage