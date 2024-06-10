import React, { useEffect, useState } from 'react'
import { useFirebaseContext } from '../contexts/FirebaseContext'

const HomePage = () => {
    const {data} = useFirebaseContext()
    
    const updateTitle = (updatedTitle) => {
        Object.keys(data) !== 0 && setTitle(updatedTitle)
    }
    const [title, setTitle] = useState(data.homePage.main.title)
    console.log(title);

    

  return (
    <section className='w-full h-screen flex items-center'>
        <div className='w-3/4 h-[80%] ml-auto mr-10 p-10 shadow-xl'>
            {Object.keys(data) !==0 && (     
                <input 
                onChange={(e) => updateTitle(e.target.value)} 
                className='w-[80%] h-[40px] focus:outline-none' 
                type="text"
                value={title}/>
            )}
        </div>
    </section>
  )
}

export default HomePage