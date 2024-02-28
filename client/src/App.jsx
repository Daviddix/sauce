import {Outlet, Route, Routes} from "react-router-dom"
import { useLayoutEffect, useState } from "react"
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import Login from "./WebApp/Pages/Login/Login"
import Signup from "./WebApp/Pages/Signup/Signup"
import DashboardLayout from "./WebApp/Pages/DashboardLayout/DashboardLayout"
import Lists from "./WebApp/Pages/Lists/Lists"
import Home from "./WebApp/Pages/Home/Home"
import MovieDetails from "./WebApp/Pages/MovieDetails/MovieDetails"
import { useAtom } from "jotai"
import { isSignedInAtom, userInfoAtom } from "./WebApp/globals/atom"

function App() {
  const dashboardTemplate = 
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
  
  const [profileFetchStatus, setProfileFetchStatus] = useState("loading")
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)

async function getUserInfo(){
  setProfileFetchStatus("loading")
  try{
    const rawFetch = await fetch("http://localhost:3000/app/user/info",{
      credentials: "include"
    })  
    const fetchJson = await rawFetch.json()
    if(!rawFetch.ok){
      throw Error("Err", {cause : fetchJson})
    }

    setUserInfo(fetchJson)
    setIsSignedIn(true)
    setProfileFetchStatus("completed")
  }
  catch(err){
    setIsSignedIn(false)
    setProfileFetchStatus("error")
  }
}

  useLayoutEffect(() => {
    getUserInfo() 
  },[])

  return (
   <Routes >
    <Route path='/' element={<LandingPage />} />
    <Route path='/app/login' element={<Login />} />
    <Route path='/app/signup' element={<Signup />} />
    <Route path='/app/movie/:movieId' element={<MovieDetails />} />
    
    <Route path='/app/' element={dashboardTemplate}>
        <Route index element={<Home />} />
        <Route path='list/:listId' element={<Lists />} />
      </Route>

   </Routes>
  )
}

export default App
