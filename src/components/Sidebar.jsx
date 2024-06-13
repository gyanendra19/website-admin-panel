import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFirebaseContext } from '../contexts/FirebaseContext'

const Sidebar = () => {

  const {setPage} = useFirebaseContext()

  return (
   <section className='w-full relative p-2'>
        <div className='w-[250px] h-[98%] bg-[#1e2434] text-white text-lg fixed shadow-2xl pt-16 pl-8 flex flex-col gap-6'>
            <span onClick={() => setPage('HomePage')} className='tracking-wider cursor-pointer'>Home Page</span>
            <span onClick={() => setPage('RetailPage')} className='tracking-wider cursor-pointer'>Retail Page</span>
            <span onClick={() => setPage('UsersPage')} className='tracking-wider cursor-pointer'>Users Page</span>
        </div>
   </section>
  )
}

export default Sidebar