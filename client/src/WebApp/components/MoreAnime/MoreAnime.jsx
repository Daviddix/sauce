import plusIconButton from "../../../assets/app assets/icons/plus-icon.svg"
import tvIconButton from "../../../assets/app assets/icons/tv-icon.svg"
import linkArrowIcon from "../../../assets/app assets/icons/link-arrow-icon.svg"

import "./MoreAnime.css"
import { useAtom } from "jotai"
import { animeIdToAddToListAtom, isSignedInAtom, mainLinkForAnimeAtom} from "../../globals/atom"
import { useState } from "react"
import { useParams } from "react-router-dom"
import AddToListModalAnime from "../AddToListModalAnime/AddToListModalAnime"
import toast, { Toaster } from "react-hot-toast"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal"
import WatchNowModalAnime from "../WatchNowModalAnime/WatchNowModalAnime"

function MoreAnime() {
  const [mainAnimeLink] = useAtom(mainLinkForAnimeAtom)
  const [showListModal, setShowListModal] = useState(false)
  const [animeIdToAddToList, setAnimeIdToAddToList] = useAtom(animeIdToAddToListAtom)
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
  const [showWatchModal, setShowWatchModal] = useState(false)

    const {animeId} = useParams()

    function showListModalFn(){
      setShowListModal(true)
  }

  return (
    mainAnimeLink !== "" && <div className="anime-more-section">
      {showListModal && <AddToListModalAnime setShowListModal={setShowListModal} />}

      {showWatchModal && <WatchNowModalAnime setShowWatchModal={setShowWatchModal} animeId={animeId} />}

      {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
                <h1 className="subheading">More</h1>

                <div className="more-button-container">

                  <a href={mainAnimeLink} target="_blank" rel="noopener noreferrer">
                    <button className="button-text-style primary-button">More Info About this Anime
                <img src={linkArrowIcon} alt="arrow icon" />
                </button>
                  </a>
                

                <button 
                 onClick={()=>{
                  if(isSignedIn){
                  setAnimeIdToAddToList(animeId)
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

export default MoreAnime