import {Link, useNavigate, useParams} from "react-router-dom"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import activeStatusIcon from "../../../assets/app assets/icons/active-status-icon.svg"
import endedStatusIcon from "../../../assets/app assets/icons/ended-status-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"
import videoIcon from "../../../assets/app assets/icons/video-icon.svg"

import "./TopAnimeDetails.css"

import { useEffect, useState } from "react"
import DetailsSkeleton from "../SkeletonLoaders/DetailsSkeleton/DetailsSkeleton"
import AddToListModalAnime from "../../components/AddToListModalAnime/AddToListModalAnime"
import { isSignedInAtom,animeIdToAddToListAtom, animeMatchPercentageAtom, mainLinkForAnimeAtom, allAnimeAtom } from "../../globals/atom"
import { useAtom } from "jotai"
import toast, { Toaster } from "react-hot-toast"
import TopMovieDetailsError from "../TopMovieDetailsError/TopMovieDetailsError"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal"
import WatchNowModalAnime from "../WatchNowModalAnime/WatchNowModalAnime"

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
    const [showWatchModal, setShowWatchModal] = useState(false)
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
            const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/anime/${animeId}`)
            const fetchInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error("an error", {cause : fetchInJson})
            }
            setTopAnimeInfo(fetchInJson)
            if(allAnime.length == 0){
                setAllAnime([{
                    animeName: fetchInJson.name,
                    animeId: fetchInJson.id,
                    matchPercent : 0,
                    animeReleaseDate: fetchInJson.first_air_date,
                    animeOverview: fetchInJson.overview,
                    animeRating : fetchInJson.vote_average,
                    animePoster : fetchInJson.poster_path,
                    animeSeasons : fetchInJson.number_of_seasons,
                    animeEpisodes : fetchInJson.number_of_episodes
                  }])
                }
            setAnimeFetchStatus("completed")
            console.log(fetchInJson)
            document.title = `Sauce | ${fetchInJson.name}(${(fetchInJson.first_air_date.slice(0, 4))})`
            setMainAnimeLink(fetchInJson.homepage)
        }
        catch(err){
            console.log(err)
            setAnimeFetchStatus("error")
        }
    }

    function showListModalFn(){
        setShowListModal(true)
    }

    function handleBackButton(){
        navigate(-1)
    }

  return (
    <div className="top-anime-details">
            {showListModal && <AddToListModalAnime setShowListModal={setShowListModal} />}

            {showWatchModal && <WatchNowModalAnime setShowWatchModal={setShowWatchModal} animeId={animeId} />}

            {animeFetchStatus == "loading" && <DetailsSkeleton /> }

            {animeFetchStatus == "error" && <TopMovieDetailsError 
            content={"anime"}
            refreshFromError={getAnimeDetails} handleBackButton={handleBackButton} />}

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
                        setShowWatchModal(true)
                    }}
                    className="transparent-button">
                        <img src={tvIcon} alt="watch now" />
                    </button>

                    <button 
                    onClick={()=>{
                        if(isSignedIn){
                            showListModalFn()
                            setAnimeIdToAddToList(animeId)
                        }else{
                            setShowNotAuthenticatedModal(true)
                        }
                    }}
                    className="transparent-button"><img src={plusIcon} alt="add a anime to a list" /></button>
                </div>
            </div>

            <div className={topAnimeInfo.name.length > 20? "top-anime-image large" : "top-anime-image"}>
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
                            <img src={videoIcon} alt="video icon" />
                            <p className="tiny-body">{topAnimeInfo.number_of_seasons} Seasons - {topAnimeInfo.number_of_episodes} Episodes</p>
                        </div>

                        <div className="status">
                            <img src={topAnimeInfo.in_production ? activeStatusIcon : endedStatusIcon} alt="status indicator" />
                            <p className="tiny-body">
                            {topAnimeInfo.in_production ? "Ongoing": "Ended"}
                            </p>
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