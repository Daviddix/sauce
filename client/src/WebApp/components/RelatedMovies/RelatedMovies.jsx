import { useEffect, useState } from "react"
import SingleRelatedMovie from "../SingleRelatedMovie/SingleRelatedMovie"
import "./RelatedMovies.css"
import { useParams } from "react-router-dom"

function RelatedMovies() {
  const [relatedMovies, setRelatedMovies] = useState([])
  const [fetchStatus, setFetchStatus] = useState("loading")

  const {movieId} = useParams()
  
  useEffect(()=>{
    getRelatedMovies(movieId)
  }, [movieId])

  async function getRelatedMovies(id){
    try{
      const rawFetch = await fetch(`http://localhost:3000/app/movie/${id}/related`)
  
      const fetchInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("err", {cause : fetchInJson})
      }
      setRelatedMovies(fetchInJson)
      setFetchStatus("completed")
    }
    catch(err){
      console.log(err, "in related movies section")
    }
  }

  const mappedRelatedMovies = relatedMovies.map(({id, title, poster_path, release_date})=>{
    return <SingleRelatedMovie 
    key={id}
    movieId={id}
    title={title}
    image={poster_path}
    date={release_date}
    />
  })
  return (
    <div className="related-movies">
            <h1 className="other-heading">Related Movies</h1>
                <div className="related-movies-container">
                  <div className="related-movies-container-inner">
                    {mappedRelatedMovies}
                  </div>
                </div>
            
        </div>
  )
}

export default RelatedMovies