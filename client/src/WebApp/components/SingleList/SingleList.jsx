import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleList.css"

function SingleList({listName, listCoverImage,moviesInList, activeListId, setActiveListId, id}) {
  return ( 
    <div
    onClick={()=>{
      setActiveListId(id)
    }}
    tabIndex={0} 
    className={activeListId == id? "single-list active" : "single-list"}>
              <img src={`https://image.tmdb.org/t/p/w1280/${listCoverImage}`} alt="list background image" className="bg" />

            <div className="list-inner">
              <div className="list-name-number">
                <h2 className="sub-sub-heading">{listName}</h2>
                <p className="sub-body-style">{moviesInList.length} Movie
                {moviesInList.length > 1?
                 "s" : 
                 ""}</p>
              </div>
            </div>
    </div>
  )
}

export default SingleList