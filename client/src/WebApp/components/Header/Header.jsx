import { useAtom } from "jotai"
import menuIcon from "../../../assets/app assets/icons/menu-icon.svg"
import "./Header.css"
import { openSidebarAtom, showLogoutModalAtom, userInfoAtom, userInfoStatusAtom } from "../../globals/atom"
import {Link} from "react-router-dom"
import logoutIcon from "../../../assets/app assets/icons/log-out-icon.svg"


function Header() {
    const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
    const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoStatusAtom)
    const [showLogoutModal, setShowLogoutModal] = useAtom(showLogoutModalAtom)


  return (
    <header className="home-header">
                <div className="header-inner">
                <button 
                onClick={()=>{
                    setOpenSidebar(true)
                }}
                className="menu">
                    <img src={menuIcon} alt="open list" />
                </button>

                {userInfoStatus == "completed"&&
                userInfo.profilePicture&&   
                <div className="right">                 
                    <button className="profile-button">
                    <img src={userInfo.profilePicture} alt="profile icon" className="user-profile-pic" />
                </button> 
                
                <button 
            onClick={()=>{
              setShowLogoutModal(true)
            }}
            className="logout-button"><img src={logoutIcon} alt="logout" /></button>
            </div>
}
                {userInfoStatus == "error" && <Link to={"/app/signup"}>
                <button className="cta">Signup</button>
                </Link> 
                }
                </div>
                
            </header>
    )
}

export default Header