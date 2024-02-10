import "./Sidebar.css"
import SingleList from "../SingleList/SingleList"
import ProfileContainer from "../ProfileContainer/ProfileContainer"
import SidebarHeader from "../SidebarHeader/SidebarHeader"

function Sidebar() {
  return (
    <aside className="sidebar-and-overlay">
      <div className="sidebar">
      <SidebarHeader />

        <div className="lists-container">
          {/* <SingleList /> */}
        </div>

        <ProfileContainer />
      </div>
        
    </aside>
  )
}

export default Sidebar