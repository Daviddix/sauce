import { useAtom } from "jotai"
import SingleGPTResponse from "../SingleGPTResponse/SingleGPTResponse"
import GPTResponseSkeleton from "../SkeletonLoaders/GPTResponseSkeleton/GPTResponseSkeleton"


import "./GPTResponse.css" 

import {useEffect, useState} from "react"
import { disableInputAtom, gptToRefreshAtom, messagesAtom } from "../../globals/atom"

function GPTResponse({inputValue, id}) {
    const [movies, setMovies] = useState([])
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
            const rawFetch = await fetch("http://localhost:3000",
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
        setMovieFetchStatus("completed")
        setDisableInput(false)
        }
        catch(err){
            alert("an error ocurred")
            console.log(err)
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
        {movieFetchStatus === "error" && <div className="gpt-response-error">
            <p className="body-style">
            Oops, seems like an error ocurred when trying to get your movies. Don't worry, just click the "Retry" button and it will fix it up.
            </p>
            <br />
            <p className="other-heading">
            Possible Reason for Error: {reasonForError}
            </p>

            <button
            onClick={()=>{
                refreshFromError()
            }}
            className="primary-button button-text-style">Retry</button>
        </div> }        
    </div>
  )
}

export default GPTResponse