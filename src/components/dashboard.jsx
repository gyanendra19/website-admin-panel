import React, { useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import Sidebar from './Sidebar'
import HomePage from './HomePage'
import { useFirebaseContext } from '../contexts/FirebaseContext'


const Dashboard = () => {
    const {data, setData} = useFirebaseContext()
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
    <HomePage />
    </>
  )
}

export default Dashboard