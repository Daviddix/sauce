import plusIconButton from "../../../assets/app assets/icons/plus-icon.svg"
import tvIconButton from "../../../assets/app assets/icons/tv-icon.svg"
import linkArrowIcon from "../../../assets/app assets/icons/link-arrow-icon.svg"

import "./More.css"
import { useAtom } from "jotai"
import { isSignedInAtom, mainLinkForMovieAtom, movieIdToAddToListAtom } from "../../globals/atom"
import { useState } from "react"
import { useParams } from "react-router-dom"
import AddToListModal from "../AddToListModal/AddToListModal"
import toast, { Toaster } from "react-hot-toast"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal"
import WatchNowModal from '../../components/WatchNowModal/WatchNowModal'

function More() {
  const [mainMovieLink] = useAtom(mainLinkForMovieAtom)
  const [showListModal, setShowListModal] = useState(false)
  const [movieIdToAddToList, setMovieIdToAddToList] = useAtom(movieIdToAddToListAtom)
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
  const [showWatchModal, setShowWatchModal] = useState(false)

    const {movieId} = useParams()

    function showListModalFn(){
      setShowListModal(true)
  }

  return (
    mainMovieLink !== "" && <div className="movie-more-section">
      {showListModal && <AddToListModal setShowListModal={setShowListModal} />}

      {showWatchModal && <WatchNowModal setShowWatchModal={setShowWatchModal} movieId={movieIdToAddToList}/> }

      {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
                <h1 className="subheading">More</h1>

                <div className="more-button-container">

                  <a href={mainMovieLink} target="_blank" rel="noopener noreferrer">
                    <button className="button-text-style primary-button">More Info About this Movie
                <img src={linkArrowIcon} alt="arrow icon" />
                </button>
                  </a>
                

                <button 
                 onClick={()=>{
                  if(isSignedIn){
                  setMovieIdToAddToList(movieId)
                  showListModalFn()
                  }else{
                    setShowNotAuthenticatedModal(true)
                  }
              }}
                className="button-text-style secondary-button">
                <img 
                src={plusIconButton} alt="add icon" />
                    Add to List
                </button>

                <button
                onClick={()=>{
                  setShowWatchModal(true)
                }}
                className="button-text-style secondary-button">
                <img src={tvIconButton} alt="tv icon" />
                    Watch Now
                </button>
                </div>
    </div>
  )
}

export default More