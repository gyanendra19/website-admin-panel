import React from 'react'
import FAQs from './FAQs'

const FAQPage = () => {
    return (
        <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
               <FAQs />
            </div>
        </section>
    )
}

export default FAQPage