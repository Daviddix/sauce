import { Link } from "react-router-dom"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleListAnimep.css"
import toast from "react-hot-toast"

function SingleListAnimep({animeName, animeReleaseDate, animePoster, animeId, listId, getInformationAboutListFunction, listName, deleteList, listInfo}) {
    async function deleteAnimeFromList(){
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/list/anime/${listId}/m`,{
                method : "DELETE",
                body : JSON.stringify({animeId}),
                credentials : "include",
                headers: {
                    "Content-Type": "application/json",
                  }
            })
            const fetchJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error("err", {cause : fetchJson})
            }

            if(listInfo.animeInList.length == 1){
                notifyForAnimeDeletedFromList(listName)
                deleteList(listId)
                return
            }
            getInformationAboutListFunction()
            notifyForAnimeDeletedFromList(listName)
        }
        catch(err){
            console.log(err)
            notifyForDeleteAnimeInListListError()
        }
    }

    function notifyForAnimeDeletedFromList(name){
        return toast.success(`Your anime has successfully been deleted from the list : -${name}`, {
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

    function notifyForDeleteAnimeInListListError(){
        return toast.error('Oops... An error ocurred when trying to delete that anime from your list, please try again', {
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
    <div className="single-list-anime">
                <img src={`https://image.tmdb.org/t/p/w1280/${animePoster}`}  alt={`anime poster for ${animeName}`} />
                <div className="single-list-anime-details">
                    <h1 className="list-anime-title">{animeName}({animeReleaseDate.slice(0, 4)})</h1>

                    <div className="list-anime-options">
                        <button
                        onClick={deleteAnimeFromList}
                        >Delete</button>

                        <Link to={`/app/anime/${animeId}`}>
                        <button className="c">More  Info 
                            <img src={rightArrowIcon} alt="" />

                        </button>
                        </Link>
                    </div>
                </div>
            </div>
  )
}

export default SingleListAnimep