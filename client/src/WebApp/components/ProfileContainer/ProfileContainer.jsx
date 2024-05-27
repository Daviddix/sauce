import "./ProfileContainer.css"
import { useAtom } from "jotai"
import {userInfoAtom, userInfoStatusAtom} from "../../globals/atom"
import { Link } from "react-router-dom"

function ProfileContainer() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoStatusAtom)

  
  return (
      <div className="profile-view-list">
          <div className="profile-view-list-inner">
          {userInfoStatus == "completed" &&
          <>
          <img src={userInfo.profilePicture} alt="your profile picture" className="profile-icon" />
            <p className="sub-sub-heading">{userInfo.username}</p>
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