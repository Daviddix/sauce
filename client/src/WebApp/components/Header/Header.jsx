import { useAtom } from "jotai"
import menuIcon from "../../../assets/app assets/icons/menu-icon.svg"
import "./Header.css"
import { openSidebarAtom, userInfoAtom } from "../../globals/atom"


function Header() {
    const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
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

                <button>
                    <img src={userInfo.profilePicture} alt="profile icon" />
                </button>
                </div>
                
            </header>
    )
}

export default Header