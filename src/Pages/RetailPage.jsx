import React from 'react'
import RetailLandingSec from '../components/RetailLanding'
import RetailGenie from '../components/RetailGenie'
import RetailAssistant from '../components/RetailAssistant'
import RetailPageAi from '../components/RetailPageAi'
import RetailStreamline from '../components/RetailStreamline'

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