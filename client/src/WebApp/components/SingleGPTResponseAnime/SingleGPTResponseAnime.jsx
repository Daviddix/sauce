import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"

import "./SingleGPTResponseAnime.css"
import NotAuthenticatedModal from '../../components/NotAuthenticatedModal/NotAuthenticatedModal'
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAtom } from "jotai";
import {animeIdToAddToListAtom, animeMatchPercentageAtom, isSignedInAtom} from "../../globals/atom"
import toast from "react-hot-toast"
import AddToListModalAnime from "../AddToListModalAnime/AddToListModalAnime"
import WatchNowModalAnime from "../WatchNowModalAnime/WatchNowModalAnime"

function SingleGPTResponseAnime({animeName, matchPercent, animeId, animeReleaseDate, animeOverview, animeRating, animePoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    const [showListModal, setShowListModal] = useState(false)
    const [animeIdToAddToList, setAnimeIdToAddToList] = useAtom(animeIdToAddToListAtom)
    const [animeMatchPercentage, setAnimeMatchPercentage] = useAtom(animeMatchPercentageAtom)
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
    const [showWatchModal, setShowWatchModal] = useState(false)

    function showListModalFn(){
        setShowListModal(true)
    }

    function showNotAuthenticatedModalFn(){
        setShowNotAuthenticatedModal(true)
    }

    function goToMainAnimePage(){
        setAnimeMatchPercentage(matchPercent)
        navigate(`/app/anime/${animeId}`)
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
    <div className="anime-image-and-details">
        {showListModal && <AddToListModalAnime setShowListModal={setShowListModal} />}

        {showWatchModal && <WatchNowModalAnime setShowWatchModal={setShowWatchModal} animeId={animeId} />}

        {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
        <div className="anime-image">
            <div className="accuracy-tooltip">
               <p className={accuracyClassName}>{matchPercent}%</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w1280/${animePoster}`} alt={`anime poster from ${animeName}`} />
        </div>

        <div className="anime-details">
            <div className="heading-and-rating">
                <h1 className="tight-heading-style">{animeName}({String(animeReleaseDate).slice(0, 4)})</h1>
                <small>• {animeRating.toFixed()} / 10</small>
            </div>

            <p className="anime-description sub-body-style">
                {animeOverview}
            </p>

            <div className="anime-options">
                <button 
                onClick={goToMainAnimePage}
                className="button-text-style primary-button">
                    About this anime
                    <img src={rightArrowIcon} alt="right arrow icon" />
                </button>

                <button 
                onClick={()=>{
                    if(isSignedIn){
                        showListModalFn()
                        setAnimeIdToAddToList(animeId)
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

export default SingleGPTResponseAnime