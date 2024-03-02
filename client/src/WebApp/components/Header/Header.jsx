import { useAtom } from "jotai"
import menuIcon from "../../../assets/app assets/icons/menu-icon.svg"
import "./Header.css"
import { openSidebarAtom, userInfoAtom, userInfoStatusAtom } from "../../globals/atom"
import {Link} from "react-router-dom"


function Header() {
    const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
    const [userInfoStatus, setUserInfoStatus] = useAtom(userInfoStatusAtom)
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

                {userInfoStatus == "completed"?
                userInfo.profilePicture?                    
                    <button>
                    <img src={userInfo.profilePicture} alt="profile icon" className="user-profile-pic" />
                </button> :
                <Link to={"/app/signup"}>
                <button className="cta">Signup</button>
                </Link> : ""
                }
                </div>
                
            </header>
    )
}

export default Header