import { useAtom } from "jotai"
import SingleGPTResponse from "../SingleGPTResponse/SingleGPTResponse"
import GPTResponseSkeleton from "../SkeletonLoaders/GPTResponseSkeleton/GPTResponseSkeleton"

import "./GPTResponse.css" 

import {useEffect, useState} from "react"
import { disableInputAtom, gptToRefreshAtom, messagesAtom,moviesAtom } from "../../globals/atom"
import GPTResponseError from "../GPTResponseError/GPTResponseError"

function GPTResponse({inputValue, id}) {
    const [movies, setMovies] = useState([])
    const [allMovies, setAllMovies] = useAtom(moviesAtom)
    const [movieFetchStatus, setMovieFetchStatus] = useState("loading")
    const [messages, setMessages] = useAtom(messagesAtom)
    const [reasonForError, setReasonForError] = useState("unknown")
    const [disableInput, setDisableInput] = useAtom(disableInputAtom)
    const [gptToRefresh, setGptToRefresh] = useAtom(gptToRefreshAtom)


    useEffect(()=>{
        makeRequestForMovieData(inputValue)
    }, [])

    useEffect(()=>{
        if(gptToRefresh == 0){
            
        }else if(gptToRefresh == id){
            makeRequestForMovieData(inputValue)
            setGptToRefresh(0)
        }
    }, [gptToRefresh])

    async function makeRequestForMovieData(movieDescription){
        setMovieFetchStatus("loading")
        setDisableInput(true)
        try{
            const rawFetch = await fetch("http://localhost:3000/app/movie",
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({movieDescription}),
        })
        const jsonFetchData = await rawFetch.json()
        if(!rawFetch.ok){
            throw new Error({cause : "test"})
        }
        setMovies(jsonFetchData)
        setAllMovies((prev) => [...prev, ...jsonFetchData])
        setMovieFetchStatus("completed")
        setDisableInput(false)
        }
        catch(err){
            setReasonForError(err.cause? err.cause : "Network Error")
            setMovieFetchStatus("error")
            setDisableInput(false)
        }
        
    }

    function refreshFromError(){
        const {key} = messages.filter((message)=> message.key == id && message.from == "GPT")[0]
       setGptToRefresh(key)
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

    const skeletons = <>
    <GPTResponseSkeleton />
    <GPTResponseSkeleton />
    <GPTResponseSkeleton />
    <GPTResponseSkeleton />
    <GPTResponseSkeleton />
    <GPTResponseSkeleton />
    <GPTResponseSkeleton />
    </>
  return (
    <div className="gpt-response-container">
        <h1>Top Results</h1>
        {movieFetchStatus === "loading" && skeletons}    
        {movieFetchStatus === "completed" && mappedMovies}
        {movieFetchStatus === "error" && <GPTResponseError 
        reasonForError={reasonForError}
        refreshFromError={refreshFromError} />}        
    </div>
  )
}

export default GPTResponse