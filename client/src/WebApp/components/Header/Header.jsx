import { useAtom } from "jotai"
import menuIcon from "../../../assets/app assets/icons/menu-icon.svg"
import "./Header.css"
import { openSidebarAtom } from "../../globals/atom"


function Header() {
    const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
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
                    <img src="" alt="profile icon" />
                </button>
                </div>
                
            </header>
    )
}

export default Header