import "./Sidebar.css"
import ProfileContainer from "../ProfileContainer/ProfileContainer"
import SidebarHeader from "../SidebarHeader/SidebarHeader"
import MovieListContainer from "../MovieListContainer/MovieListContainer"
import { useAtom } from "jotai"
import { listCategoryToShowAtom, openSidebarAtom, userInfoAtom } from "../../globals/atom"
import ListTab from "../ListTab/ListTab"
import { useState } from "react"
import AnimeListContainer from "../AnimeListContainer/AnimeListContainer"
import TvShowListContainer from "../TvShowListContainer/TvShowListContainer"

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)
  const [listCategoryToShow, setListCategoryToShow] = useAtom(listCategoryToShowAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)

  return (
    <aside className={openSidebar? "sidebar-and-overlay open" : "sidebar-and-overlay"}>
      <div className="sidebar">
      <SidebarHeader setOpenSidebar={setOpenSidebar} /> 

        {userInfo.username && <ListTab listCategoryToShow={listCategoryToShow} setListCategoryToShow={setListCategoryToShow} />}

        {listCategoryToShow == "Movies" && <MovieListContainer />}
        {listCategoryToShow == "Anime" && <AnimeListContainer />}
        {listCategoryToShow == "TV Shows" && <TvShowListContainer />}

        

        <ProfileContainer />
      </div>
        
    </aside>
  )
}

export default Sidebar