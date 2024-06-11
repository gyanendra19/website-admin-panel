import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, redirect } from "react-router-dom"
import Login from "./components/login"
import Dashboard from "./components/dashboard"
import { FirebaseContext } from "./contexts/FirebaseContext"
import { useState } from "react"
import { auth } from "./utils/firebaseConfig"

function App() {
  const [data, setData] = useState({})
  console.log(data);


  const route =  createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      </>
    )
  )

  return (
    <>
    <FirebaseContext.Provider value={{data, setData}}>
      <RouterProvider router={route} />
    </FirebaseContext.Provider>
    </>
  )
}

export default App
