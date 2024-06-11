import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
   <section className='w-full relative p-2'>
        <div className='w-[250px] h-[98%] bg-[#1e2434] text-white text-lg fixed shadow-2xl pt-16 pl-8 flex flex-col gap-6'>
            <NavLink className='tracking-wider' to='/home'>Home Page</NavLink>
            <NavLink className='tracking-wider' to='/retail'>Retail Page</NavLink>
        </div>
   </section>
  )
}

export default Sidebar