import { useAtom } from "jotai"
import SingleGPTResponse from "../SingleGPTResponse/SingleGPTResponse"
import GPTResponseSkeleton from "../SkeletonLoaders/GPTResponseSkeleton/GPTResponseSkeleton"
import { set,get } from 'idb-keyval'
import "./GPTResponse.css" 

import {useEffect, useState} from "react"
import { disableInputAtom, gptToRefreshAtom, messagesAtom,allMoviesAtom } from "../../globals/atom"
import GPTResponseError from "../GPTResponseError/GPTResponseError"
import { Toaster } from "react-hot-toast"

function GPTResponse({inputValue, id, searchCategory}) {
    const [movies, setMovies] = useState([])
    const [allMovies, setAllMovies] = useAtom(allMoviesAtom)
    const [movieFetchStatus, setMovieFetchStatus] = useState("loading")
    const [messages, setMessages] = useAtom(messagesAtom)
    const [reasonForError, setReasonForError] = useState("unknown")
    const [disableInput, setDisableInput] = useAtom(disableInputAtom)
    const [gptToRefresh, setGptToRefresh] = useAtom(gptToRefreshAtom)

    useEffect(()=>{
        makeRequestForMovieData(inputValue, id)
    }, [])

    useEffect(()=>{
        if(gptToRefresh == 0){
            
        }else if(gptToRefresh == id){
            makeRequestWithoutIndexedDb(inputValue, id)
            setGptToRefresh(0)
        }
    }, [gptToRefresh])

    async function makeRequestForMovieData(movieDescription, idOfResponse) {
      setMovieFetchStatus("loading")
      setDisableInput(true)
      try {
        const moviesFromIndexedDb = await get(idOfResponse)
        if (typeof moviesFromIndexedDb == "object" && moviesFromIndexedDb.length > 0) {
            setMovies(moviesFromIndexedDb)
            setAllMovies((prev) => [...prev, ...moviesFromIndexedDb])
            setMovieFetchStatus("completed")
            setDisableInput(false)
        } else {
          const rawFetch = await fetch("https://sauce-backend.onrender.com/app/movie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movieDescription }),
          })
          const jsonFetchData = await rawFetch.json()
          if (!rawFetch.ok) {
            throw new Error({ cause: "test" })
          }
          setMovies(jsonFetchData)
          setAllMovies((prev) => [...prev, ...jsonFetchData])
          set(idOfResponse, jsonFetchData)
          setMovieFetchStatus("completed")
          setDisableInput(false)
        }
      } catch (err) {
        setReasonForError(err.cause ? err.cause : "Network Error")
        setMovieFetchStatus("error")
        setDisableInput(false)
      }
    }

    async function makeRequestWithoutIndexedDb(movieDescription, idOfResponse){
      
        setMovieFetchStatus("loading")
        setDisableInput(true)
        try{
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/movie",
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
        set(idOfResponse, jsonFetchData)
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
        <Toaster toastOptions={{duration : 4000}} />

        <h1>Top Results <small>{searchCategory}</small></h1>
        {movieFetchStatus === "loading" && skeletons}    
        {movieFetchStatus === "completed" && mappedMovies}
        {movieFetchStatus === "error" && <GPTResponseError 
        page={"movies"}
        reasonForError={reasonForError}
        refreshFromError={refreshFromError} />}        
    </div>
  )
}

export default GPTResponse