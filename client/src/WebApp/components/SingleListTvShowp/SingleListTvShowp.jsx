import { Link } from "react-router-dom"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleListTvShowp.css"
import toast from "react-hot-toast"

function SingleListTvShowp({tvShowName, tvShowReleaseDate, tvShowPoster, tvShowId, listId, getInformationAboutListFunction, listName, deleteList, listInfo}) {
    async function deleteTvShowFromList(){
        try{
            const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/list/tv/${listId}/m`,{
                method : "DELETE",
                body : JSON.stringify({tvShowId}),
                credentials : "include",
                headers: {
                    "Content-Type": "application/json",
                  }
            })
            const fetchJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error("err", {cause : fetchJson})
            }

            if(listInfo.tvShowsInList.length == 1){
                notifyForTvShowDeletedFromList(listName)
                deleteList(listId)
                return
            }
            getInformationAboutListFunction()
            notifyForTvShowDeletedFromList(listName)
        }
        catch(err){
            
            notifyForDeleteTvShowInListListError()
        }
    }

    function notifyForTvShowDeletedFromList(name){
        return toast.success(`Your TV show has successfully been deleted from the list : -${name}`, {
            position : "bottom-right",
            style : {
                fontFamily : "manrope",
                fontSize : "14px",
                backgroundImage : "linear-gradient(to bottom right,rgb(196, 255, 201), transparent)",
                border : "2px solid white",
                boxShadow : "0 0 .4rem #00000018"
            },
            icon : "📃"
        })
    }

    function notifyForDeleteTvShowInListListError(){
        return toast.error('Oops... An error ocurred when trying to delete that TV show from your list, please try again', {
            position : "bottom-right",
            style : {
                fontFamily : "manrope",
                fontSize : "14px",
                backgroundImage : "linear-gradient(to bottom right,rgb(255, 210, 196), transparent)",
                border : "2px solid white",
                boxShadow : "0 0 .4rem #00000018"
            },
            icon : "📃"
        })
    }
  return (
    <div className="single-list-tv-show">
                <img src={`https://image.tmdb.org/t/p/w1280/${tvShowPoster}`}  alt={`tv Show poster for ${tvShowName}`} />
                <div className="single-list-tv-show-details">
                    <h1 className="list-tv-show-title">{tvShowName}({tvShowReleaseDate.slice(0, 4)})</h1>

                    <div className="list-tv-show-options">
                        <button
                        onClick={deleteTvShowFromList}
                        >Delete</button>

                        <Link to={`/app/tv/${tvShowId}`}>
                        <button className="c">More  Info 
                            <img src={rightArrowIcon} alt="" />

                        </button>
                        </Link>
                    </div>
                </div>
            </div>
  )
}

export default SingleListTvShowp