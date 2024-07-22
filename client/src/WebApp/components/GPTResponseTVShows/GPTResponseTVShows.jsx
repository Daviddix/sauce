import { useAtom } from "jotai"
import GPTResponseSkeleton from "../SkeletonLoaders/GPTResponseSkeleton/GPTResponseSkeleton"
import { set,get } from 'idb-keyval'

import {useEffect, useState} from "react"
import { disableInputAtom, gptToRefreshAtom, messagesAtom, allTvShowsAtom } from "../../globals/atom"
import GPTResponseError from "../GPTResponseError/GPTResponseError"
import { Toaster } from "react-hot-toast"
import SingleGPTResponseTvShow from "../SingleGPTResponseTvShow/SingleGPTResponseTvShow"

function GPTResponseTVShows({inputValue, id, searchCategory}) {
    const [tvShows, setTvShows] = useState([])
    const [tvShowFetchStatus, setTvShowFetchStatus] = useState("loading")
    const [reasonForError, setReasonForError] = useState("unknown")
    const [allTvShows, setAllTvShows] = useAtom(allTvShowsAtom)
    const [messages, setMessages] = useAtom(messagesAtom)
    const [disableInput, setDisableInput] = useAtom(disableInputAtom)
    const [gptToRefresh, setGptToRefresh] = useAtom(gptToRefreshAtom) 

    useEffect(()=>{
        makeRequestForTvShowData(inputValue, id)
    }, [])

    useEffect(()=>{
        if(gptToRefresh == 0){
            
        }else if(gptToRefresh == id){
            makeRequestForTvShowDataWithoutIndexedDb(inputValue, id)
            setGptToRefresh(0)
        }
    }, [gptToRefresh])


    async function makeRequestForTvShowData(tvShowDescription, idOfResponse) {
      setTvShowFetchStatus("loading")
      setDisableInput(true)
      try {
        const tvShowFromIndexedDb = await get(idOfResponse)
        if (typeof tvShowFromIndexedDb == "object" && tvShowFromIndexedDb.length > 0) {
            setTvShows(tvShowFromIndexedDb)
            setAllTvShows((prev) => [...prev, ...tvShowFromIndexedDb])
            setTvShowFetchStatus("completed")
            setDisableInput(false)
        } else {
          const rawFetch = await fetch("https://sauce-backend.onrender.com/app/tv", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tvShowDescription }),
          })
          const jsonFetchData = await rawFetch.json()
          if (!rawFetch.ok) {
            throw new Error({ cause: "test" })
          }
          setTvShows(jsonFetchData)
          setAllTvShows((prev) => [...prev, ...jsonFetchData])
          set(idOfResponse, jsonFetchData)
          setTvShowFetchStatus("completed")
          setDisableInput(false)
        }
      } catch (err) {
        setReasonForError(err.cause ? err.cause : "Network Error")
        setTvShowFetchStatus("error")
        setDisableInput(false)
      }
    }

    async function makeRequestForTvShowDataWithoutIndexedDb(tvShowDescription, idOfResponse){
        setTvShowFetchStatus("loading")
        setDisableInput(true)
        try{
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/tv",
        {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tvShowDescription}),
        })
        const jsonFetchData = await rawFetch.json()
        if(!rawFetch.ok){
            throw new Error({cause : "test"})
        }
        setTvShows(jsonFetchData)
        setAllTvShows((prev) => [...prev, ...jsonFetchData])
        set(idOfResponse, jsonFetchData)
        setTvShowFetchStatus("completed")
        setDisableInput(false)
    }
         catch(err){
            setReasonForError(err.cause? err.cause : "Network Error")
            setTvShowFetchStatus("error")
            setDisableInput(false)
        }
    }

    function refreshFromError(){
        const {key} = messages.filter((message)=> message.key == id && message.from == "GPT")[0]
       setGptToRefresh(key)
    }
    
    const mappedTvShows = tvShows.map(({tvShowName, matchPercent, tvShowId, tvShowReleaseDate, tvShowOverview, tvShowRating, tvShowPoster})=>{
    return (
    <SingleGPTResponseTvShow
    key={tvShowId}
    tvShowName={tvShowName} 
    matchPercent={matchPercent} 
    tvShowId={tvShowId} 
    tvShowReleaseDate={tvShowReleaseDate} 
    tvShowOverview={tvShowOverview} 
    tvShowRating={tvShowRating} 
    tvShowPoster={tvShowPoster} 
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
        {tvShowFetchStatus === "loading" && skeletons}    
        {tvShowFetchStatus === "completed" && mappedTvShows}
        {tvShowFetchStatus === "error" && <GPTResponseError 
        page={"tv Shows"}
        reasonForError={reasonForError}
        refreshFromError={refreshFromError} />}        
    </div>
  )
}

export default GPTResponseTVShows