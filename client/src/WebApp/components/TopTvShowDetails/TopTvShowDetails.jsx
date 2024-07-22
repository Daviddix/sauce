import {useNavigate, useParams} from "react-router-dom"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import activeStatusIcon from "../../../assets/app assets/icons/active-status-icon.svg"
import endedStatusIcon from "../../../assets/app assets/icons/ended-status-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"
import videoIcon from "../../../assets/app assets/icons/video-icon.svg"

import "./TopTvShowDetails.css"

import { useEffect, useState } from "react"
import DetailsSkeleton from "../SkeletonLoaders/DetailsSkeleton/DetailsSkeleton"
import AddToListModalTvShows from "../../components/AddToListModalTvShows/AddToListModalTvShows"
import { isSignedInAtom,tvShowIdToAddToListAtom, allTvShowsAtom, tvShowsMatchPercentageAtom, mainLinkForTvShowAtom } from "../../globals/atom"
import { useAtom } from "jotai"
import toast, { Toaster } from "react-hot-toast"
import TopMovieDetailsError from "../TopMovieDetailsError/TopMovieDetailsError"
import NotAuthenticatedModal from "../NotAuthenticatedModal/NotAuthenticatedModal" 
import WatchNowModalTvShows from "../WatchNowModalTvShows/WatchNowModalTvShows"

function TopTvShowDetails() {
    const [topTvShowInfo, setTopTvShowInfo] = useState({})
    const [tvShowFetchStatus, setTvShowFetchStatus] = useState("loading")
    const [showListModal, setShowListModal] = useState(false)
    const [tvShowIdToAddToList, setTvShowIdToAddToList] = useAtom(tvShowIdToAddToListAtom) 
    const [tvShowMatchPercentage, setYvShowMatchPercentage] = useAtom(tvShowsMatchPercentageAtom)
    const [mainTvShowLink, setMainTvShowLink] = useAtom(mainLinkForTvShowAtom)
    const [allTvShows, setAllTvShows] = useAtom(allTvShowsAtom)
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [showNotAuthenticatedModal, setShowNotAuthenticatedModal] = useState(false)
    const [showWatchModal, setShowWatchModal] = useState(false)
    const navigate = useNavigate()

    const mappedGenres = topTvShowInfo.genres?.map((singleGenre)=>{
        return <div key={singleGenre.name} className="button-text-style">{singleGenre.name}</div>
    })
    const {tvShowId} = useParams()

    useEffect(()=>{
        getTvShowDetails()
    }, [tvShowId])

    async function getTvShowDetails(){
        setTvShowFetchStatus("loading")
        try{
            const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/tv/${tvShowId}`)
            const fetchInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error({cause : fetchInJson})
            }
            setTopTvShowInfo(fetchInJson)
            if(allTvShows.length == 0){
                setAllTvShows([{
                    tvShowName: fetchInJson.name,
                    tvShowId: fetchInJson.id,
                    matchPercent : 0,
                    tvShowReleaseDate: fetchInJson.first_air_date,
                    tvShowOverview: fetchInJson.overview,
                    tvShowRating : fetchInJson.vote_average,
                    tvShowPoster : fetchInJson.poster_path,
                    tvShowSeasons : fetchInJson.number_of_seasons,
                    tvShowEpisodes : fetchInJson.number_of_episodes
                  }])
                }
            setTvShowFetchStatus("completed")
            document.title = `Sauce | ${fetchInJson.name}(${(fetchInJson.first_air_date.slice(0, 4))})`
            setMainTvShowLink(fetchInJson.homepage)
        }
        catch(err){
            setTvShowFetchStatus("error")
        }
    }

    function showListModalFn(){
        setShowListModal(true)
    }

    function handleBackButton(){
        navigate(-1)
    }

  return (
    <div className="top-tv-show-details">
            {showListModal && <AddToListModalTvShows setShowListModal={setShowListModal} />}

            {showWatchModal && <WatchNowModalTvShows setShowWatchModal={setShowWatchModal} tvShowId={tvShowId} />}

            {tvShowFetchStatus == "loading" && <DetailsSkeleton /> }

            {tvShowFetchStatus == "error" && <TopMovieDetailsError refreshFromError={getTvShowDetails} handleBackButton={handleBackButton} />}

            {tvShowFetchStatus == "completed" &&
            <>
            {showNotAuthenticatedModal && <NotAuthenticatedModal setShowNotAuthenticatedModal={setShowNotAuthenticatedModal} />}
            <div className="top-tv-show-details-header">
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
                            setTvShowIdToAddToList(tvShowId)
                        }else{
                            setShowNotAuthenticatedModal(true)
                        }
                    }}
                    className="transparent-button"><img src={plusIcon} alt="add a tv show to a list" /></button>
                </div>
            </div>

            <div className={topTvShowInfo.name.length >20 ? "top-tv-show-image large" : "top-tv-show-image"}>
            <img src={`https://image.tmdb.org/t/p/original${topTvShowInfo.backdrop_path}`} alt="" />
            </div>
            

            <div className="top-tv-show-details-info">
                <div className="tv-show-name-and-stats">
                    <h1 className="tight-heading-style">{topTvShowInfo.name}({topTvShowInfo.first_air_date.slice(0, 4)})</h1>

                    <div className="tv-show-stats">
                        <div className="rating">
                            <img src={starIcon} alt="star" />
                            <p className="tiny-body">{topTvShowInfo.vote_average.toFixed()}/10</p>
                        </div>

                        <div className="length">
                            <img src={videoIcon} alt="video icon" />
                            <p className="tiny-body">{topTvShowInfo.number_of_seasons} Seasons - {topTvShowInfo.number_of_episodes} Episodes</p>
                        </div>

                        <div className="status">
                            <img src={topTvShowInfo.in_production ? activeStatusIcon : endedStatusIcon} alt="status indicator" />
                            <p className="tiny-body">
                            {topTvShowInfo.in_production ? "Ongoing": "Ended"}
                            </p>
                        </div>

                        {tvShowMatchPercentage !== 0 && <div className="accuracy">
                            <img src={rankIcon} alt="ranking" />
                            <p className="tiny-body">
                                {tvShowMatchPercentage}%
                            </p>
                        </div>}
                    </div>
                </div>

                <div className="tv-show-description">
                    <h1 className="subheading">Overview</h1>

                    <p className="sub-body-style">{topTvShowInfo.overview}</p>
                </div>

                <div className="tv-show-genre">
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

export default TopTvShowDetails