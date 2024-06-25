import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, redirect } from "react-router-dom"
import Login from "./components/login"
import Dashboard from "./components/dashboard"
import { FirebaseContext } from "./contexts/FirebaseContext"
import { useEffect, useState } from "react"
import { auth } from "./utils/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import Layout from "./Layout"
import Protected from "./Protected"

function App() {
  const [data, setData] = useState({})
  const [page, setPage] = useState('HomePage')
  console.log(data);


  const route = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="" element ={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </>
    )
  )

  return (
    <>
      <FirebaseContext.Provider value={{ data, setData, page, setPage }}>
        <RouterProvider router={route} />
      </FirebaseContext.Provider>
    </>
  )
}

export default App
