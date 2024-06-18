import React, { useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import Sidebar from './Sidebar'
import HomePage from './HomePage'
import { useFirebaseContext } from '../contexts/FirebaseContext'
import UsersPage from './UsersPage'
import RetailPage from './RetailPage'


const Dashboard = () => {
    const {data, setData} = useFirebaseContext()
    const {page} = useFirebaseContext()

    useEffect(() => {
        onValue(ref(database, 'data'), (snapshot) => {
            if(snapshot !== null){
                setData(snapshot.val())
            }
        })
    }, [])

    console.log(data);
  return (
    <>
    <Sidebar />
    {page === 'HomePage' ? <HomePage /> :
    page === 'UsersPage' ? <UsersPage /> : 
    page === 'RetailPage' ? <RetailPage /> : ''
    }
   
    </>
  )
}

export default Dashboard