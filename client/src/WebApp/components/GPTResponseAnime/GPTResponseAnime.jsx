import { useAtom } from "jotai"
import GPTResponseSkeleton from "../SkeletonLoaders/GPTResponseSkeleton/GPTResponseSkeleton"
import { set,get } from 'idb-keyval'

import {useEffect, useState} from "react"
import { disableInputAtom, gptToRefreshAtom, messagesAtom,  allAnimeAtom } from "../../globals/atom"
import GPTResponseError from "../GPTResponseError/GPTResponseError"
import { Toaster } from "react-hot-toast"
import SingleGPTResponseAnime from "../SingleGPTResponseAnime/SingleGPTResponseAnime"

function GPTResponseAnime({inputValue, id, searchCategory}) {
    const [anime, setAnime] = useState([])
    const [animeFetchStatus, setAnimeFetchStatus] = useState("loading")
    const [reasonForError, setReasonForError] = useState("unknown")
    const [allAnime, setAllAnime] = useAtom(allAnimeAtom)
    const [messages, setMessages] = useAtom(messagesAtom)
    const [disableInput, setDisableInput] = useAtom(disableInputAtom)
    const [gptToRefresh, setGptToRefresh] = useAtom(gptToRefreshAtom) 

    useEffect(()=>{
        makeRequestForAnimeData(inputValue, id)
    }, [])

    useEffect(()=>{
        if(gptToRefresh == 0){
            
        }else if(gptToRefresh == id){
            makeRequestForAnimeDataWithoutIndexedDb(inputValue, id)
            setGptToRefresh(0)
        }
    }, [gptToRefresh])


    async function makeRequestForAnimeData(animeDescription, idOfResponse) {
      setAnimeFetchStatus("loading")
      setDisableInput(true)
      try {
        const animeFromIndexedDb = await get(idOfResponse)
        if (typeof animeFromIndexedDb == "object" && animeFromIndexedDb.length > 0) {
            setAnime(animeFromIndexedDb)
            setAllAnime((prev) => [...prev, ...animeFromIndexedDb])
            setAnimeFetchStatus("completed")
            setDisableInput(false)
        } else {
          const rawFetch = await fetch("https://sauce-backend.onrender.com/app/anime", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ animeDescription }),
          })
          const jsonFetchData = await rawFetch.json()
          if (!rawFetch.ok) {
            throw new Error({ cause: "test" })
          }
          setAnime(jsonFetchData)
          setAllAnime((prev) => [...prev, ...jsonFetchData])
          set(idOfResponse, jsonFetchData)
          setAnimeFetchStatus("completed")
          setDisableInput(false)
        }
      } catch (err) {
        
        setReasonForError(err.cause ? err.cause : "Network Error")
        setAnimeFetchStatus("error")
        setDisableInput(false)
      }
    }

    async function makeRequestForAnimeDataWithoutIndexedDb(animeDescription, idOfResponse){
        setAnimeFetchStatus("loading")
        setDisableInput(true)
        try{
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/anime",
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({animeDescription}),
        })
        const jsonFetchData = await rawFetch.json()
        if(!rawFetch.ok){
            throw new Error({cause : "test"})
        }
        setAnime(jsonFetchData)
        setAllAnime((prev) => [...prev, ...jsonFetchData])
        set(idOfResponse, jsonFetchData)
        setAnimeFetchStatus("completed")
        setDisableInput(false)
    }
         catch(err){
            setReasonForError(err.cause? err.cause : "Network Error")
            setAnimeFetchStatus("error")
            setDisableInput(false)
        }
    }

    function refreshFromError(){
        const {key} = messages.filter((message)=> message.key == id && message.from == "GPT")[0]
       setGptToRefresh(key)
    }
    
    const mappedAnime = anime.map(({animeName, matchPercent, animeId, animeReleaseDate, animeOverview, animeRating, animePoster})=>{
    return (
    <SingleGPTResponseAnime
    key={animeId}
    animeName={animeName} 
    matchPercent={matchPercent} 
    animeId={animeId} 
    animeReleaseDate={animeReleaseDate} 
    animeOverview={animeOverview} 
    animeRating={animeRating} 
    animePoster={animePoster} 
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
        {animeFetchStatus === "loading" && skeletons}    
        {animeFetchStatus === "completed" && mappedAnime}
        {animeFetchStatus === "error" && <GPTResponseError 
        page={"anime"}
        reasonForError={reasonForError}
        refreshFromError={refreshFromError} />}        
    </div>
  )
}

export default GPTResponseAnime