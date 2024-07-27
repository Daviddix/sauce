import {Outlet, Route, Routes} from "react-router-dom"
import { useEffect, useLayoutEffect, useState } from "react"
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import Login from "./WebApp/Pages/Login/Login"
import Signup from "./WebApp/Pages/Signup/Signup"
import DashboardLayout from "./WebApp/Pages/DashboardLayout/DashboardLayout"
import Lists from "./WebApp/Pages/Lists/Lists"
import Home from "./WebApp/Pages/Home/Home"
import MovieDetails from "./WebApp/Pages/MovieDetails/MovieDetails"
import AnimeDetails from "./WebApp/Pages/AnimeDetails/AnimeDetails"
import TvShowDetails from "./WebApp/Pages/TvShowDetails/TvShowDetails" 
import { useAtom } from "jotai"
import { isSignedInAtom, refreshListAtom, refreshUserDetailsAtom, userInfoAtom, userInfoStatusAtom } from "./WebApp/globals/atom"
import NotFound from "./WebApp/Pages/404/404"


import { clear } from 'idb-keyval'
import AnimeLists from "./WebApp/Pages/AnimeLists/AnimeLists"
import TvShowLists from "./WebApp/Pages/TvShowLists/TvShowLists"
 
function App() {
  const dashboardTemplate = 
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
  
  const [profileFetchStatus, setProfileFetchStatus] = useState("loading")
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [refreshUserDetails, setRefreshUserDetails] = useAtom(refreshUserDetailsAtom)
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoStatusAtom)

async function getUserInfo(){
  setProfileFetchStatus("loading")
  setUserInfoStatus("loading")
  try{
    const rawFetch = await fetch("https://sauce-backend.onrender.com/app/user/info",{
      credentials: "include"
    })  
    const fetchJson = await rawFetch.json()
    if(!rawFetch.ok){
      throw Error("Err", {cause : fetchJson})
    }

    setUserInfo(fetchJson)
    setIsSignedIn(true)
    setProfileFetchStatus("completed")
    setUserInfoStatus("completed")
  }
  catch(err){
    console.log(err)
    setUserInfo({})
    setIsSignedIn(false)
    setProfileFetchStatus("error")
    setUserInfoStatus("error")
  }
}

  useLayoutEffect(() => {
    getUserInfo() 

    return ()=>{
      clear()
    }
  },[])

  useEffect(()=>{
      if(refreshUserDetails == false){
        return
      }else{
        getUserInfo()
        setRefreshUserDetails(false)
      }
  }, [refreshUserDetails])
  

  return (
   <Routes >
    <Route path='/' element={<LandingPage />} />
    <Route path='/app/login' element={<Login />} />
    <Route path='/app/signup' element={<Signup />} />
    <Route path='/app/movie/:movieId' element={<MovieDetails />} />
    <Route path='/app/anime/:animeId' element={<AnimeDetails />} />
    <Route path='/app/tv/:tvShowId' element={<TvShowDetails />} />
    
    <Route path='/app/' element={dashboardTemplate}>
        <Route index element={<Home />} />
        <Route path='list/movie/:movieListId' element={<Lists />} />
        <Route path='list/anime/:animeListId' element={<AnimeLists />} />
        <Route path='list/tv/:tvShowListId' element={<TvShowLists />} />
    </Route>

    <Route path='*' element={<NotFound />} />

   </Routes>
  )
}

export default App
