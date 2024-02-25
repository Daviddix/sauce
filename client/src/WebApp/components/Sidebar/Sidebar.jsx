import "./Sidebar.css"
import ProfileContainer from "../ProfileContainer/ProfileContainer"
import SidebarHeader from "../SidebarHeader/SidebarHeader"
import SidebarListContainer from "../SidebarListContainer/SidebarListContainer"
import { useAtom } from "jotai"
import { openSidebarAtom } from "../../globals/atom"

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
  return (
    <aside className={openSidebar? "sidebar-and-overlay open" : "sidebar-and-overlay"}>
      <div className="sidebar">
      <SidebarHeader setOpenSidebar={setOpenSidebar} />

        <SidebarListContainer />

        <ProfileContainer />
      </div>
        
    </aside>
  )
}

export default Sidebar