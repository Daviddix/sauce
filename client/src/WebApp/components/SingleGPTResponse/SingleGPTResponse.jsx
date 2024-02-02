import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import retryIcon from "../../../assets/app assets/icons/retry-icon.svg"

import "./SingleGPTResponse.css"
import { useEffect, useState } from "react"

function SingleGPTResponse({movieName, matchPercent, movieId, movieReleaseDate, movieOverview, movieRating, moviePoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    useEffect(()=>{
        if (matchPercent <= 49) {
         setAccuracyClassName("low") 
        }else if(matchPercent <= 79){
          setAccuracyClassName("med") 
        }else{
          setAccuracyClassName("high") 
        }
      }, [matchPercent])
  return (
    <div className="movie-image-and-details">
        <div className="movie-image">
            <div className="accuracy-tooltip">
               <p className={accuracyClassName}>{matchPercent}%</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w500/${moviePoster}`} alt={`movie poster from ${movieName}`} />
        </div>

        <div className="movie-details">
            <div className="heading-and-rating">
                <h1 className="tight-heading-style">{movieName}({String(movieReleaseDate).slice(0, 4)})</h1>
                <small>• {movieRating.toFixed()} / 10</small>
            </div>

            <p className="movie-description sub-body-style">
                {movieOverview}
            </p>

            <div className="movie-options">
                <button className="button-text-style primary-button">
                    About this movie
                    <img src={rightArrowIcon} alt="right arrow icon" />
                </button>

                <button className="button-text-style secondary-button">
                <img src={plusIcon} alt="add icon" />
                    Add to List
                </button>

                <button className="button-text-style secondary-button">
                <img src={tvIcon} alt="tv icon" />
                    Watch Now
                </button>

                <button className="button-text-style secondary-button">
                <img src={retryIcon} alt="retry icon" />
                    Retry Search
                </button>
            </div>
        </div>
        </div>
  )
}

export default SingleGPTResponse