import { Link } from "react-router-dom"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleListMovie.css"

function SingleListMovie({movieName, movieReleaseDate, moviePoster, movieId}) {
  return (
    <div className="single-list-movie">
                <img src={`https://image.tmdb.org/t/p/w1280/${moviePoster}`}  alt="" />
                <div className="single-list-movie-details">
                    <h1 className="list-movie-title">{movieName}({movieReleaseDate.slice(0, 4)})</h1>

                    <div className="list-movie-options">
                        <button>Delete</button>

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