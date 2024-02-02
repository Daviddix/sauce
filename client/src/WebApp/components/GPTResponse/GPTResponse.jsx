import { useAtom } from "jotai"
import SingleGPTResponse from "../SingleGPTResponse/SingleGPTResponse"
import GPTResponseSkeleton from "../SkeletonLoaders/GPTResponseSkeleton/GPTResponseSkeleton"


import "./GPTResponse.css" 

import {useEffect, useState} from "react"
import { disableInputAtom } from "../../atoms/atom"

function GPTResponse({inputValue}) {
    const [movies, setMovies] = useState([])
    const [movieFetchStatus, setMovieFetchStatus] = useState("loading")
    const [disableInput, setDisableInput] = useAtom(disableInputAtom)


    useEffect(()=>{
        makeRequestForMovieData(inputValue)
    }, [])

    async function makeRequestForMovieData(movieDescription){
        setDisableInput(true)
        const rawFetch = await fetch("https://sauce-backend.onrender.com",
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({movieDescription}),
        })
        const jsonFetchData = await rawFetch.json()
        setMovies(jsonFetchData)
        setMovieFetchStatus("completed")
        setDisableInput(false)
    }

    const mappedMovies = movies.map(({movieName, matchPercent, movieId, movieReleaseDate, movieOverview, movieRating, moviePoster})=>{
    return (
    <SingleGPTResponse 
    key={movieId}
    movieName={movieName} 
    matchPercent={matchPercent} 
    movieId={movieId} 
    movieReleaseDate={movieReleaseDate} 
    movieOverview={movieOverview} 
    movieRating={movieRating} 
    moviePoster={moviePoster} 
    />)
    })
  return (
    <div className="gpt-response-container">
        <h1>Top Results</h1>
        {movieFetchStatus === "loading" && 
        <>
        <GPTResponseSkeleton />
        <GPTResponseSkeleton />
        <GPTResponseSkeleton />
        <GPTResponseSkeleton />
        <GPTResponseSkeleton />
        <GPTResponseSkeleton />
        <GPTResponseSkeleton />
        </>
        }    
        {movieFetchStatus === "completed" && mappedMovies}        
    </div>
  )
}

export default GPTResponse