import {Link, useNavigate, useParams} from "react-router-dom"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import timeIcon from "../../../assets/app assets/icons/time-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"


import "./TopMovieDetails.css"
import { useEffect, useState } from "react"
import { formatTime } from "../../globals/others"
import MovieDetailsSkeleton from "../SkeletonLoaders/MovieDetailsSkeleton/MovieDetailsSkeleton"
import AddToListModal from "../../components/AddToListModal/AddToListModal"
import { mainLinkForMovieAtom, movieIdToAddToListAtom, movieMatchPercentageAtom, moviesAtom } from "../../globals/atom"
import { useAtom } from "jotai"
import { Toaster } from "react-hot-toast"
import TopMovieDetailsError from "../TopMovieDetailsError/TopMovieDetailsError"


function TopMovieDetails() {
    const [topMovieInfo, setTopMovieInfo] = useState({})
    const [movieFetchStatus, setMovieFetchStatus] = useState("loading")
    const [showListModal, setShowListModal] = useState(false)
    const [movieIdToAddToList, setMovieIdToAddToList] = useAtom(movieIdToAddToListAtom)
    const [movieMatchPercentage, setMovieMatchPercentage] = useAtom(movieMatchPercentageAtom)
    const [mainMovieLink, setMainMovieLink] = useAtom(mainLinkForMovieAtom)
    const [allMovies, setAllMovies] = useAtom(moviesAtom)
    const navigate = useNavigate()

    const mappedGenres = topMovieInfo.genres?.map((singleGenre)=>{
        return <div className="button-text-style">{singleGenre.name}</div>
    })
    const {movieId} = useParams()

    useEffect(()=>{
        getMovieDetails()
    }, [movieId])

    async function getMovieDetails(){
        setMovieFetchStatus("loading")
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/movie/${movieId}`)
            const fetchInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error({cause : fetchInJson})
            }
            setTopMovieInfo(fetchInJson)
            if(movies.length == 0){
                setAllMovies([{
                    movieName: fetchInJson.title,
                    movieId: fetchInJson.id,
                    matchPercent : 0,
                    movieReleaseDate: fetchInJson.release_date,
                    movieOverview: fetchInJson.overview,
                    movieRating : fetchInJson.vote_average,
                    moviePoster : fetchInJson.poster_path
                  }])
                }
            setMovieFetchStatus("completed")
            setMainMovieLink(fetchInJson.homepage)
        }
        catch(err){
            setMovieFetchStatus("error")
        }
    }

    function showListModalFn(){
        setShowListModal(true)
    }

    function handleBackButton(){
        navigate(-1)
    }
  return (
    <div className="top-movie-details">
            {showListModal && <AddToListModal setShowListModal={setShowListModal} />}

            {movieFetchStatus == "loading" && <MovieDetailsSkeleton /> }

            {movieFetchStatus == "error" && <TopMovieDetailsError refreshFromError={getMovieDetails} handleBackButton={handleBackButton} />}

            {movieFetchStatus == "completed" &&
            <>
            <div className="top-movie-details-header">
                 <button 
                 onClick={handleBackButton}
                 className="transparent-button">
                    <img src={backIcon} alt="go back" />
                </button>
               

                <div className="right">
                    <button className="transparent-button"><img src={tvIcon} alt="go back" /></button>

                    <button 
                    onClick={()=>{
                        setMovieIdToAddToList(movieId)
                        showListModalFn()
                    }}
                    className="transparent-button"><img src={plusIcon} alt="add a movie to a list" /></button>
                </div>
            </div>

            <div className="top-movie-image">
            <img src={`https://image.tmdb.org/t/p/original${topMovieInfo.backdrop_path}`} alt="" />
            </div>
            

            <div className="top-movie-details-info">
                <div className="movie-name-and-stats">
                    <h1 className="tight-heading-style">{topMovieInfo.original_title}({topMovieInfo.release_date.slice(0, 4)})</h1>

                    <div className="movie-stats">
                        <div className="rating">
                            <img src={starIcon} alt="star" />
                            <p className="tiny-body">{topMovieInfo.vote_average.toFixed()}/10</p>
                        </div>

                        <div className="length">
                            <img src={timeIcon} alt="clock icon" />
                            <p className="tiny-body">{formatTime(topMovieInfo.runtime)}</p>
                        </div>

                        {movieMatchPercentage !== 0 && <div className="accuracy">
                            <img src={rankIcon} alt="ranking" />
                            <p className="tiny-body">
                                {movieMatchPercentage}%
                            </p>
                        </div>}
                    </div>
                </div>

                <div className="movie-description">
                    <h1 className="subheading">Overview</h1>

                    <p className="sub-body-style">{topMovieInfo.overview}</p>
                </div>

                <div className="movie-genre">
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

export default TopMovieDetails