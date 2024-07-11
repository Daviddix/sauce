import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"

import "./SingleGPTResponse.css"
import AddToListModal from "../../components/AddToListModal/AddToListModal"
import NotAuthenticatedModal from '../../components/NotAuthenticatedModal/NotAuthenticatedModal'
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAtom } from "jotai";
import {isSignedInAtom, movieIdToAddToListAtom, movieMatchPercentageAtom} from "../../globals/atom"
import toast from "react-hot-toast"
import WatchNowModal from '../../components/WatchNowModal/WatchNowModal'

function SingleGPTResponse({movieName, matchPercent, movieId, movieReleaseDate, movieOverview, movieRating, moviePoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    const [showListModal, setShowListModal] = useState(false)
    const [movieIdToAddToList, setMovieIdToAddToList] = useAtom(movieIdToAddToListAtom)
    const [movieMatchPercentage, setMovieMatchPercentage] = useAtom(movieMatchPercentageAtom)
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
    const [showWatchModal, setShowWatchModal] = useState(false)

    function showListModalFn(){
        setShowListModal(true)
    }

    function showNotAuthenticatedModalFn(){
        setShowNotAuthenticatedModal(true)
    }

    function goToMainMoviePage(){
        setMovieMatchPercentage(matchPercent)
        navigate(`/app/movie/${movieId}`)
    }

    async function featureComingSoon(name){
        return toast.success(`The ${name} feature isn't available at the moment. Don't worry, David is working on it:)`, {
            position : "bottom-right",
            style : {
                fontFamily : "manrope",
                fontSize : "14px",
                backgroundImage : "linear-gradient(to bottom right,rgb(266, 255, 201), transparent)",
                border : "2px solid white",
                boxShadow:
      `2.6px 4.3px 2.2px rgba(0, 0, 0, 0.045),
      6.2px 10.2px 5.3px rgba(0, 0, 0, 0.065),
      11.6px 19.3px 10px rgba(0, 0, 0, 0.08),
      20.8px 34.4px 17.9px rgba(0, 0, 0, 0.095),
      38.9px 64.3px 33.4px rgba(0, 0, 0, 0.115),
      93px 154px 80px rgba(0, 0, 0, 0.16)`
    
    
            },
            icon : "📣"
        })
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
        {showWatchModal && <WatchNowModal setShowWatchModal={setShowWatchModal} movieId={movieId} />}
        {showListModal && <AddToListModal setShowListModal={setShowListModal} />}
        {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
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
                    if(isSignedIn){
                        showListModalFn()
                        setMovieIdToAddToList(movieId)
                    }else{
                        showNotAuthenticatedModalFn()
                    }
                }}
                className="button-text-style secondary-button">
                <img src={plusIcon} alt="add icon" />
                    Add to List
                </button>

                <button 
                onClick={()=>{
                    setShowWatchModal(true)
                    featureComingSoon("Watch Now")
                }}
                className="button-text-style secondary-button">
                <img src={tvIcon} alt="tv icon" />
                    Watch Now
                </button>

                
            </div>
        </div>
        
        </div>
  )
}

export default SingleGPTResponse