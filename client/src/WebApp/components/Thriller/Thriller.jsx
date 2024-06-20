import { useEffect, useState } from "react"
import "./Thriller.css"
import { useParams } from "react-router-dom"

function Thriller({page}) {
  const [thrillerLink, setTrillerLink] = useState("")
  const [thrillerFetchStatus, setThrillerFetchStatus] = useState("loading")

  const {animeId} = useParams()
  const {movieId} = useParams()
  const {tvId} = useParams()

  useEffect(()=>{
    getThrillerData()
  }, [animeId, movieId])


  async function getThrillerData(){
    let url;
    setThrillerFetchStatus("loading")
    try{
      if(movieId){
      url = `http://localhost:3000/app/movie/${movieId}/video`
      }else if(tvId){
      url = `http://localhost:3000/app/tv/${tvId}/video`
      }else if(animeId){
      url = `http://localhost:3000/app/anime/${animeId}/video`
      }
      const rawFetch = await fetch(url)

      const jsonFetch = await rawFetch.json()

      if(!rawFetch.ok){
         throw new Error()
      }
      setTrillerLink(jsonFetch.results[0].key)
      setThrillerFetchStatus("completed")
    }
    catch{
      setThrillerFetchStatus("error")
    }
  }
  return (
        <div className="movie-thriller-section">
          <h1 className="subheading">Thriller</h1>
          {
            thrillerFetchStatus === "loading" ? 
             <div className="video skeleton"></div> 
            :
            <iframe 
            frameBorder="0"
            id="inlineFrameExample"
            title={thrillerLink}
            src={"https://www.youtube.com/embed/" + thrillerLink}
            className="video"
          />
          }
        </div>
      )
}

export default Thriller