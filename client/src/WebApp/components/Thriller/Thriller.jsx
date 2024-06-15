import { useEffect, useState } from "react"
import "./Thriller.css"
import { useParams } from "react-router-dom"

function Thriller() {
  const [movieThrillerLink, setMovieThrillerLink] = useState({})
  const [thrillerFetchStatus, setThrillerFetchStatus] = useState("loading")

  const {movieId} = useParams()

  useEffect(()=>{
    getMovieThrillerData()
  }, [movieId])


  async function getMovieThrillerData(){
    setThrillerFetchStatus("loading")
    try{
      const rawFetch = await fetch(`http://localhost:3000/app/movie/${movieId}/video`)
      const jsonFetch = await rawFetch.json()

      if(!rawFetch.ok){
         throw new Error()
      }
      setMovieThrillerLink(jsonFetch.results[0].key)
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
            title={movieThrillerLink}
            src={"https://www.youtube.com/embed/" + movieThrillerLink}
            className="video"
          />
          }
        </div>
      )
}

export default Thriller