import listIcon from "../../../assets/app assets/icons/list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import "./SidebarHeader.css"

function SidebarHeader({setOpenSidebar}) {
  return (
    <header className="list-header">
            <div className="list-header-inner">
              <div className="icon-and-heading">
              <img src={listIcon} alt="list icon" />

                <p className="sub-sub-heading">Your Lists</p>
              </div>

              <button 
              onClick={()=>{
                setOpenSidebar(false) 
              }}
              className="close-sidebar">
                <img src={closeIcon} alt="close sidebar" />
              </button>
                
            </div>
        </header>
  )
}

export default SidebarHeader