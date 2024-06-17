import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"

import "./SingleGPTResponseAnime.css"
import AddToListModal from "../../components/AddToListModal/AddToListModal"
import NotAuthenticatedModal from '../../components/NotAuthenticatedModal/NotAuthenticatedModal'
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAtom } from "jotai";
import {animeIdToAddToListAtom, animeMatchPercentageAtom, isSignedInAtom} from "../../globals/atom"
import toast from "react-hot-toast"

function SingleGPTResponseAnime({animeName, matchPercent, animeId, animeReleaseDate, animeOverview, animeRating, animePoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    const [showListModal, setShowListModal] = useState(false)
    const [animeIdToAddToList, setAnimeToAddToList] = useAtom(animeIdToAddToListAtom)
    const [animeMatchPercentage, setAnimeMatchPercentage] = useAtom(animeMatchPercentageAtom)
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)

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

    function featureComingSoon(name){
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
    <div className="anime-image-and-details">
        {showListModal && <AddToListModal setShowListModal={setShowListModal} />}
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

export default SingleGPTResponseAnime