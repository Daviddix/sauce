import { useEffect, useState } from "react"
import "./Thriller.css"

function Thriller() {
  const [movieThrillerLink, setMovieThrillerLink] = useState({})
  useEffect(()=>{
    getMovieThrillerData()
  }, [])

  async function getMovieThrillerData(){
    try{
      const rawFetch = await fetch("http://localhost:3000/app/movie/2062/video")
      const jsonFetch = await rawFetch.json()

      if(!rawFetch.ok){
         throw new Error()
      }
      setMovieThrillerLink(jsonFetch.results[0].key)
    }
    catch{
      alert("an err")
    }
  }
  return (
    <div className="movie-thriller-section">
                <h1 className="subheading">Thriller</h1>

                <iframe 
                frameBorder="0"
                id="inlineFrameExample"
                title={movieThrillerLink}
                
                src={"https://www.youtube.com/embed/" + movieThrillerLink}
                className="video">

                </iframe>
            </div>
  )
}

export default Thriller