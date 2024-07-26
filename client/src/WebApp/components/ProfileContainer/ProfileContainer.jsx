import "./ProfileContainer.css"
import { useAtom } from "jotai"
import {showLogoutModalAtom, userInfoAtom, userInfoStatusAtom} from "../../globals/atom"
import { Link } from "react-router-dom"
import logoutIcon from "../../../assets/app assets/icons/log-out-icon.svg"

function ProfileContainer() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoStatusAtom)
  const [showLogoutModal, setShowLogoutModal] = useAtom(showLogoutModalAtom)
  
  console.log(userInfo)
  
  return (
      <div className="profile-view-list">
          <div className="profile-view-list-inner">
          {userInfoStatus == "completed" &&
          <>
          <img src={userInfo.profilePicture} alt="your profile picture" className="profile-icon" />
            <p className="sub-sub-heading">{userInfo.username}</p>

            <button 
            onClick={()=>{
              setShowLogoutModal(true)
            }}
            className="logout-button"><img src={logoutIcon} alt="logout" /></button>
          </>
          }

          {
            userInfoStatus == "error" && <Link to={"/app/signup"}>
            <button className="cta">Signup</button>
            </Link>
          }
          </div>
    </div>
  )
}

export default ProfileContainer