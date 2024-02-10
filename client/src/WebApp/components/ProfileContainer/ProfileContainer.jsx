import testListImage from "../../../assets/app assets/images/test.jpg"
import {useEffect, useState} from "react"
import "./ProfileContainer.css"
import { useAtom } from "jotai"
import { isSignedInAtom, userInfoAtom } from "../../globals/atom"

function ProfileContainer() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [profileFetchStatus, setProfileFetchStatus] = useState("loading")
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  
  useEffect(()=>{
    getUserInfo() 
  }, [])

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
  return (
    profileFetchStatus == "completed" &&
      <div className="profile-view-list">
          <div className="profile-view-list-inner">
          <img src={userInfo.profilePicture} alt="your profile picture" className="profile-icon" />
            <p className="sub-sub-heading">{userInfo.username}</p>
          </div>
            
    </div>
  )
}

export default ProfileContainer