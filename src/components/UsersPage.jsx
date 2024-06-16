import React from 'react'
import DemoAllUsers from './DemoAllUsers'

const UsersPage = () => {
  return (
    <section className='w-full h-screen flex items-center'>
    <div className='w-3/4 h-[80%] ml-auto flex flex-col gap-5 mr-10 p-10 shadow-2xl overflow-y-scroll'>
        <DemoAllUsers />
    </div>
</section>
  )
}

export default UsersPage