import plusIconButton from "../../../assets/app assets/icons/plus-icon.svg"
import tvIconButton from "../../../assets/app assets/icons/tv-icon.svg"
import linkArrowIcon from "../../../assets/app assets/icons/link-arrow-icon.svg"

import "./MoreTvShows.css"
import { useAtom } from "jotai"
import { tvShowIdToAddToListAtom, isSignedInAtom, mainLinkForTvShowAtom} from "../../globals/atom"
import { useState } from "react"
import { useParams } from "react-router-dom"
import AddToListModalTvShows from "../AddToListModalTvShows/AddToListModalTvShows"
import toast, { Toaster } from "react-hot-toast"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal"
import WatchNowModalTvShows from "../WatchNowModalTvShows/WatchNowModalTvShows"

function MoreTvShows() {
  const [mainTvShowLink] = useAtom(mainLinkForTvShowAtom)
  const [showListModal, setShowListModal] = useState(false)
  const [tvShowIdToAddToList, setTvShowIdToAddToList] = useAtom(tvShowIdToAddToListAtom)
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
  const [showWatchModal, setShowWatchModal] = useState(false)

    const {tvShowId} = useParams()

    function showListModalFn(){
      setShowListModal(true)
  }

  return (
    mainTvShowLink !== "" && <div className="tv-show-more-section">
      {showListModal && <AddToListModalTvShows setShowListModal={setShowListModal} />}

      {showWatchModal && <WatchNowModalTvShows setShowWatchModal={setShowWatchModal} tvShowId={tvShowId} />}

      {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
                <h1 className="subheading">More</h1>

                <div className="more-button-container">

                  <a href={mainTvShowLink} target="_blank" rel="noopener noreferrer">
                    <button className="button-text-style primary-button">More Info About this TV Show
                <img src={linkArrowIcon} alt="arrow icon" />
                </button>
                  </a>
                

                <button 
                 onClick={()=>{
                  if(isSignedIn){
                  setTvShowIdToAddToList(tvShowId)
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

export default MoreTvShows