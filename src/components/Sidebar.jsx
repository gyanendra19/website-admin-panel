import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
   <section className='w-full relative p-2'>
        <div className='w-[250px] h-[98%] fixed shadow-2xl pt-16 pl-8 font-medium flex flex-col gap-4'>
            <NavLink to='/home'>Home Page</NavLink>
            <NavLink to='/retail'>Retail Page</NavLink>
        </div>
   </section>
  )
}

export default Sidebar