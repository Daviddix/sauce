import menuIcon from "../../../assets/app assets/icons/menu-icon.svg"
import "./Header.css"


function Header() {
  return (
    <header className="home-header">
                <div className="header-inner">
                <button className="menu">
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