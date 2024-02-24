import { Link } from "react-router-dom"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleListMovie.css"

function SingleListMovie({movieName, movieReleaseDate, moviePoster, movieId, listId, getInformationAboutListFunction}) {
    async function deleteMovieFromList(){
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/list/${listId}`,{
                method : "DELETE",
                body : JSON.stringify({movieId})
            })
            const fetchJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error("err", {cause : fetchJson})
            }
            getInformationAboutListFunction()
        }
        catch(err){
            console.log(err)
            alert("an error ocurred when trying to delete this movie from the list it is in")
        }
    }
  return (
    <div className="single-list-movie">
                <img src={`https://image.tmdb.org/t/p/w1280/${moviePoster}`}  alt="" />
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