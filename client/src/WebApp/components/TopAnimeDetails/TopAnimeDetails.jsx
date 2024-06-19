import {Link, useNavigate, useParams} from "react-router-dom"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import timeIcon from "../../../assets/app assets/icons/time-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"

import "./TopAnimeDetails.css"

import { useEffect, useState } from "react"
import DetailsSkeleton from "../SkeletonLoaders/DetailsSkeleton/DetailsSkeleton"
import AddToListModal from "../../components/AddToListModal/AddToListModal"
import { isSignedInAtom,animeIdToAddToListAtom, animeMatchPercentageAtom, mainLinkForAnimeAtom, allAnimeAtom } from "../../globals/atom"
import { useAtom } from "jotai"
import toast, { Toaster } from "react-hot-toast"
import TopMovieDetailsError from "../TopMovieDetailsError/TopMovieDetailsError"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal"

function TopAnimeDetails() {
    const [topAnimeInfo, setTopAnimeInfo] = useState({})
    const [animeFetchStatus, setAnimeFetchStatus] = useState("loading")
    const [showListModal, setShowListModal] = useState(false)
    const [animeIdToAddToList, setAnimeIdToAddToList] = useAtom(animeIdToAddToListAtom)
    const [animeMatchPercentage, setAnimeMatchPercentage] = useAtom(animeMatchPercentageAtom)
    const [mainAnimeLink, setMainAnimeLink] = useAtom(mainLinkForAnimeAtom)
    const [allAnime, setAllAnime] = useAtom(allAnimeAtom)
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
    const navigate = useNavigate()

    const mappedGenres = topAnimeInfo.genres?.map((singleGenre)=>{
        return <div key={singleGenre.name} className="button-text-style">{singleGenre.name}</div>
    })
    const {animeId} = useParams()

    useEffect(()=>{
        getAnimeDetails()
    }, [animeId])

    async function getAnimeDetails(){
        setAnimeFetchStatus("loading")
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/movie/${animeId}`)
            const fetchInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error({cause : fetchInJson})
            }
            setTopAnimeInfo(fetchInJson)
            if(allAnime.length == 0){
                setAllAnime([{
                    animeName: fetchInJson.title,
                    animeId: fetchInJson.id,
                    matchPercent : 0,
                    animeReleaseDate: fetchInJson.first_air_date,
                    animeOverview: fetchInJson.overview,
                    animeRating : fetchInJson.vote_average,
                    animePoster : fetchInJson.poster_path
                  }])
                }
            setAnimeFetchStatus("completed")
            setMainAnimeLink(fetchInJson.homepage)
        }
        catch(err){
            console.log(err.cause)
            setAnimeFetchStatus("loading")
        }
    }

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

    function handleBackButton(){
        navigate(-1)
    }

  return (
    <div className="top-anime-details">
            {showListModal && <AddToListModal setShowListModal={setShowListModal} />}

            {animeFetchStatus == "loading" && <DetailsSkeleton /> }

            {animeFetchStatus == "error" && <TopMovieDetailsError refreshFromError={getAnimeDetails} handleBackButton={handleBackButton} />}

            {animeFetchStatus == "completed" &&
            <>
            {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
            <div className="top-anime-details-header">
                 <button 
                 onClick={handleBackButton}
                 className="transparent-button">
                    <img src={backIcon} alt="go back" />
                </button>
               

                <div className="right">
                    <button 
                    onClick={()=>{
                        featureComingSoon("Watch Now")
                    }}
                    className="transparent-button">
                        <img src={tvIcon} alt="watch now" />
                    </button>

                    <button 
                    onClick={()=>{
                        if(isSignedIn){
                            showListModalFn()
                            setAnimeIdToAddToList(movieId)
                        }else{
                            setShowNotAuthenticatedModal(true)
                        }
                    }}
                    className="transparent-button"><img src={plusIcon} alt="add a movie to a list" /></button>
                </div>
            </div>

            <div className="top-anime-image">
            <img src={`https://image.tmdb.org/t/p/original${topAnimeInfo.backdrop_path}`} alt="" />
            </div>
            

            <div className="top-anime-details-info">
                <div className="anime-name-and-stats">
                    <h1 className="tight-heading-style">{topAnimeInfo.name}({topAnimeInfo.first_air_date.slice(0, 4)})</h1>

                    <div className="anime-stats">
                        <div className="rating">
                            <img src={starIcon} alt="star" />
                            <p className="tiny-body">{topAnimeInfo.vote_average.toFixed()}/10</p>
                        </div>

                        <div className="length">
                            <img src={timeIcon} alt="clock icon" />
                            <p className="tiny-body">{formatTime(topAnimeInfo.runtime)}</p>
                        </div>

                        {animeMatchPercentage !== 0 && <div className="accuracy">
                            <img src={rankIcon} alt="ranking" />
                            <p className="tiny-body">
                                {animeMatchPercentage}%
                            </p>
                        </div>}
                    </div>
                </div>

                <div className="anime-description">
                    <h1 className="subheading">Overview</h1>

                    <p className="sub-body-style">{topAnimeInfo.overview}</p>
                </div>

                <div className="anime-genre">
                    <h1 className="subheading">Genre</h1>
                    <div className="genre-container">

                    
                    {mappedGenres}
                    </div>
                </div>
            </div>
            </>
            }

            <Toaster toastOptions={{duration : 4000}} />
    </div>
  )
}

export default TopAnimeDetails