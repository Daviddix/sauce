import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"

import "./SingleGPTResponse.css"
import AddToListModal from "../../components/AddToListModal/AddToListModal"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAtom } from "jotai";
import {movieIdToAddToListAtom} from "../../globals/atom"

function SingleGPTResponse({movieName, matchPercent, movieId, movieReleaseDate, movieOverview, movieRating, moviePoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    const [showListModal, setShowListModal] = useState(false)
    const [movieIdToAddToList, setMovieIdToAddToList] = useAtom(movieIdToAddToListAtom)

    function showListModalFn(){
        setShowListModal(true)
    }

    function goToMainMoviePage(){
        navigate(`/app/movie/${movieId}`)
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
            <img src={`https://image.tmdb.org/t/p/w1280/${moviePoster}`} alt={`movie poster from ${movieName}`} />
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
                onClick={goToMainMoviePage}
                className="button-text-style primary-button">
                    About this movie
                    <img src={rightArrowIcon} alt="right arrow icon" />
                </button>

                <button 
                onClick={()=>{
                    showListModalFn()
                    setMovieIdToAddToList(movieId)
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