import testListImage from "../../../assets/app assets/images/test.jpg"
import {useEffect, useState} from "react"
import "./ProfileContainer.css"

function ProfileContainer() {
  const [userInfo, setUserInfo] = useState({})
  useEffect(()=>{
    getUserInfo() 
  }, [])

  async function getUserInfo(){
    try{
      const rawFetch = await fetch("http://localhost:3000/app/user/info",{
        credentials: "include"
      })  
      const fetchJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw Error("Err", {cause : fetchJson.reason})
      }

      setUserInfo(fetchJson)
    }
    catch(err){
      alert("an error ocurred")
      console.log(err)
    }   
    

  }
  return (
    <div className="profile-view-list">
          <div className="profile-view-list-inner">
          <img src={userInfo.profilePicture} alt="your profile picture" className="profile-icon" />
            <p className="sub-sub-heading">{userInfo.username}</p>
          </div>
            
        </div>
  )
}

export default ProfileContainer