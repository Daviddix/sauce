import {Link, useParams} from "react-router-dom"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import timeIcon from "../../../assets/app assets/icons/time-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"
import testImage from "../../../assets/app assets/images/test.jpg"

import "./TopMovieDetails.css"
import { useEffect, useState } from "react"
import { formatTime } from "../../globals/others"


function TopMovieDetails() {
    const [topMovieInfo, setTopMovieInfo] = useState({})
    const [movieFetchStatus, setMovieFetchStatus] = useState("loading")
    const mappedGenres = topMovieInfo.genres?.map((singleGenre)=>{
        return <div className="button-text-style">{singleGenre.name}</div>
    })
    const {movieId} = useParams()

    useEffect(()=>{
        getMovieDetails()
    }, [])

    async function getMovieDetails(){
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/movie/${movieId}`)
            const fetchInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error("sdf")
            }
            setTopMovieInfo(fetchInJson)
            setMovieFetchStatus("completed")
        }
        catch(err){
            alert("an error")
        }
    }
  return (
    <div className="top-movie-details">
            {movieFetchStatus == "completed" &&
                <>
                <div className="top-movie-details-header">
                <Link to="/app">
                 <button className="transparent-button">
                    <img src={backIcon} alt="go back" />
                </button>
                </Link>
               

                <div className="right">
                    <button className="transparent-button"><img src={tvIcon} alt="go back" /></button>
                    <button className="transparent-button"><img src={plusIcon} alt="go back" /></button>
                </div>
            </div>

            <div className="top-movie-image">
            <img src={`https://image.tmdb.org/t/p/original${topMovieInfo.poster_path}`} alt="" />
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

                        <div className="accuracy">
                            <img src={rankIcon} alt="ranking" />
                            <p className="tiny-body">62%</p>
                        </div>
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
    </div>
  )
}

export default TopMovieDetails