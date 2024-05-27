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
import TopMovieDetailsError from "../TopMovieDetailsError/TopMovieDetailsError"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal"

function More() {
  const [mainMovieLink] = useAtom(mainLinkForMovieAtom)
  const [showListModal, setShowListModal] = useState(false)
  const [movieIdToAddToList, setMovieIdToAddToList] = useAtom(movieIdToAddToListAtom)
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
  const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)

    const {movieId} = useParams()

    function showListModalFn(){
      setShowListModal(true)
  }

  function featureComingSoon(name){
    return toast.success(`The ${name} feature isn't available at the moment. Don't worry, David is working on it:)`, {
        position : "bottom-right",
        style : {
            fontFamily : "manrope",
            fontSize : "14px",
            backgroundImage : "linear-gradient(to bottom right,rgb(266, 255, 201), transparent)",
            border : "2px solid white",
            boxShadow : "0 0 .4rem #00000018"
        },
        icon : "📣"
    })
}
  return (
    mainMovieLink !== "" && <div className="movie-more-section">
      {showListModal && <AddToListModal setShowListModal={setShowListModal} />}
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
                  featureComingSoon("Watch Now")
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