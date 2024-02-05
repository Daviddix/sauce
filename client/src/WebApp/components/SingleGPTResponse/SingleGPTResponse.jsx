import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import retryIcon from "../../../assets/app assets/icons/retry-icon.svg"

import "./SingleGPTResponse.css"
import AddToListModal from "../../components/AddToListModal/AddToListModal"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"

function SingleGPTResponse({movieName, matchPercent, movieId, movieReleaseDate, movieOverview, movieRating, moviePoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    const [showListModal, setShowListModal] = useState(false)

    function showListModalFn(){
        setShowListModal(true)
    }
    const navigate = useNavigate()

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
        {showListModal && <AddToListModal setShowListModal={setShowListModal} />}
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
                <button 
                onClick={()=>{
                    navigate(`/movie/${movieId}`)
                }}
                className="button-text-style primary-button">
                    About this movie
                    <img src={rightArrowIcon} alt="right arrow icon" />
                </button>

                <button 
                onClick={()=>{
                    showListModalFn()
                }}
                className="button-text-style secondary-button">
                <img src={plusIcon} alt="add icon" />
                    Add to List
                </button>

                <button className="button-text-style secondary-button">
                <img src={tvIcon} alt="tv icon" />
                    Watch Now
                </button>

                
            </div>
        </div>
        </div>
  )
}

export default SingleGPTResponse