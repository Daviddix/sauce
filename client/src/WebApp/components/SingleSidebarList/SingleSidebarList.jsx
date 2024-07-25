import "./SingleSidebarList.css"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import { useNavigate } from "react-router-dom"

function SingleSidebarList({listName, listCoverImage,moviesInList, activeListId, setActiveListId, id}) {
  const navigate = useNavigate()
  return (
    <div
    onClick={()=>{
      setActiveListId(id)
      navigate(`/app/list/movie/${id}`)
    }}
    tabIndex={0} 
    className={activeListId == id? "single-list active" : "single-list"}>
              <img src={`https://image.tmdb.org/t/p/w500/${listCoverImage}`} alt="list background image" className="bg" />

            <div className="list-inner">
              <div className="list-name-number">
                <h2 className="sub-sub-heading">{listName}</h2>
                <p className="sub-body-style">{moviesInList.length} Movie
                {moviesInList.length > 1?
                 "s" : 
                 ""}</p>
              </div>

              <img src={rightArrowIcon} alt="" />
            </div>
    </div>
  )
}

export default SingleSidebarList