import React, { useEffect, useState } from 'react'
import { useFirebaseContext } from '../contexts/FirebaseContext'
import HomeLandingSec from '../components/HomeLandingSec'
import HomeSolutionSec from '../components/HomeSolutionSec'
import HomeGMTPlatform from '../components/HomeGMTPlatform'
import HomePageGoal from '../components/HomePageGoalSec'
import HomePageCollab from '../components/HomePageCollabsec'


const HomePage = () => {
    const { data } = useFirebaseContext()

    return (
        <section className='w-full h-screen flex items-center'>
            <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
                <HomeLandingSec
                data = {data} 
                /> 
                <HomeSolutionSec data = {data} />
                <HomeGMTPlatform />
                <HomePageGoal />
                <HomePageCollab />
            </div>
        </section>
    )
}

export default HomePage