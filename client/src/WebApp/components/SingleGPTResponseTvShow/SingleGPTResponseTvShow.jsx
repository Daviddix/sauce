import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"

import "./SingleGPTResponseTvShow.css"
import NotAuthenticatedModal from '../../components/NotAuthenticatedModal/NotAuthenticatedModal'
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAtom } from "jotai";
import {isSignedInAtom, tvShowIdToAddToListAtom, tvShowsMatchPercentageAtom} from "../../globals/atom"
import toast from "react-hot-toast"
import AddToListModalTvShows from "../AddToListModalTvShows/AddToListModalTvShows"
import WatchNowModalTvShows from "../WatchNowModalTvShows/WatchNowModalTvShows"

function SingleGPTResponseTvShow({tvShowName, matchPercent, tvShowId, tvShowReleaseDate, tvShowOverview, tvShowRating, tvShowPoster}) {
    const [accuracyClassName, setAccuracyClassName] = useState("")
    const [showListModal, setShowListModal] = useState(false)
    const [tvShowIdToAddToList, setTvShowIdToAddToList] = useAtom(tvShowIdToAddToListAtom)
    const [tvShowMatchPercentage, setTvShowMatchPercentage] = useAtom(tvShowsMatchPercentageAtom)
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
    const [showWatchModal, setShowWatchModal] = useState(false)

    function showListModalFn(){
        setShowListModal(true)
    }

    function showNotAuthenticatedModalFn(){
        setShowNotAuthenticatedModal(true)
    }

    function goToMainTvShowPage(){
        setTvShowMatchPercentage(matchPercent)
        navigate(`/app/tv/${tvShowId}`)
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
    <div className="tv-show-image-and-details">
        {showListModal && <AddToListModalTvShows setShowListModal={setShowListModal} />}

        {showWatchModal && <WatchNowModalTvShows setShowWatchModal={setShowWatchModal} tvShowId={tvShowId} />}

        {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
        <div className="tv-show-image">
            <div className="accuracy-tooltip">
               <p className={accuracyClassName}>{matchPercent}%</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w1280/${tvShowPoster}`} alt={`tv poster from ${tvShowName}`} />
        </div>

        <div className="tv-show-details">
            <div className="heading-and-rating">
                <h1 className="tight-heading-style">{tvShowName}({String(tvShowReleaseDate).slice(0, 4)})</h1>
                <small>• {tvShowRating.toFixed()} / 10</small>
            </div>

            <p className="tv-show-description sub-body-style">
                {tvShowOverview}
            </p>

            <div className="tv-show-options">
                <button 
                onClick={goToMainTvShowPage}
                className="button-text-style primary-button">
                    About this Tv Show
                    <img src={rightArrowIcon} alt="right arrow icon" />
                </button>

                <button 
                onClick={()=>{
                    if(isSignedIn){
                        showListModalFn()
                        setTvShowIdToAddToList(tvShowId)
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

export default SingleGPTResponseTvShow