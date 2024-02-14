import "./Sidebar.css"
import SingleList from "../SingleList/SingleList"
import ProfileContainer from "../ProfileContainer/ProfileContainer"
import SidebarHeader from "../SidebarHeader/SidebarHeader"
import SidebarListContainer from "../SidebarListContainer/SidebarListContainer"

function Sidebar() {
  return (
    <aside className="sidebar-and-overlay">
      <div className="sidebar">
      <SidebarHeader />

        <SidebarListContainer />

        <ProfileContainer />
      </div>
        
    </aside>
  )
}

export default Sidebar