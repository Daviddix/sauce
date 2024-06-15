import "./Sidebar.css"
import ProfileContainer from "../ProfileContainer/ProfileContainer"
import SidebarHeader from "../SidebarHeader/SidebarHeader"
import MovieListContainer from "../MovieListContainer/MovieListContainer"
import { useAtom } from "jotai"
import { openSidebarAtom } from "../../globals/atom"
import ListTab from "../ListTab/ListTab"
import { useState } from "react"

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
  const [listCategoryToShow, setListCategoryToShow] = useState("Movies")

  return (
    <aside className={openSidebar? "sidebar-and-overlay open" : "sidebar-and-overlay"}>
      <div className="sidebar">
      <SidebarHeader setOpenSidebar={setOpenSidebar} /> 

        <ListTab listCategoryToShow={listCategoryToShow} setListCategoryToShow={setListCategoryToShow} />

        <MovieListContainer />

        <ProfileContainer />
      </div>
        
    </aside>
  )
}

export default Sidebar