import React, { useEffect, useState } from 'react'
import { database } from '../utils/firebaseConfig'
import { onValue, ref } from 'firebase/database'
import Sidebar from './Sidebar'
import HomePage from '../Pages/HomePage'
import { useFirebaseContext } from '../contexts/FirebaseContext'
import UsersPage from '../Pages/UsersPage'
import FAQPage from '../Pages/FAQPage'
import RetailPage from '../Pages/RetailPage'
import ProductPage from '../Pages/ProductPage'

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
    page === 'RetailPage' ? <RetailPage /> : 
    page === 'FAQPage' ? <FAQPage /> : 
    page === 'ProductPage' ? <ProductPage /> : ''
     }
   
    </>
  )
}

export default Dashboard