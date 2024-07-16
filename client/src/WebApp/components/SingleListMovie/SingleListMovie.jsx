import { Link } from "react-router-dom"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleListMovie.css"
import toast from "react-hot-toast"

function SingleListMovie({movieName, movieReleaseDate, moviePoster, movieId, listId, getInformationAboutListFunction, listName, deleteList, listInfo}) {
    async function deleteMovieFromList(){
        try{
            const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/list/movies/${listId}/m`,{
                method : "DELETE",
                body : JSON.stringify({movieId}),
                credentials : "include",
                headers: {
                    "Content-Type": "application/json",
                  }
            })
            const fetchJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error("err", {cause : fetchJson})
            }

            if(listInfo.moviesInList.length == 1){
                notifyForMovieDeletedFromList(listName)
                deleteList(listId)
                return
            }
            getInformationAboutListFunction()
            notifyForMovieDeletedFromList(listName)
        }
        catch(err){
            
            notifyForDeleteMovieInListListError()
        }
    }

    function notifyForMovieDeletedFromList(name){
        return toast.success(`Your movie has successfully been deleted from the list : -${name}`, {
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

    function notifyForDeleteMovieInListListError(){
        return toast.error('Oops... An error ocurred when trying to delete that movie from your list, please try again', {
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
    <div className="single-list-movie">
                <img src={`https://image.tmdb.org/t/p/w1280/${moviePoster}`}  alt={`movie poster for ${movieName}`} />
                <div className="single-list-movie-details">
                    <h1 className="list-movie-title">{movieName}({movieReleaseDate.slice(0, 4)})</h1>

                    <div className="list-movie-options">
                        <button
                        onClick={deleteMovieFromList}
                        >Delete</button>

                        <Link to={`/app/movie/${movieId}`}>
                        <button className="c">More  Info 
                            <img src={rightArrowIcon} alt="" />

                        </button>
                        </Link>
                    </div>
                </div>
            </div>
  )
}

export default SingleListMovie