import { useEffect, useState } from "react"
import "./RelatedAnime.css"
import { useParams } from "react-router-dom"
import RelatedMoviesSkeleton from "../SkeletonLoaders/RelatedMoviesSkeleton/RelatedMoviesSkeleton"
import RelatedMoviesError from "../RelatedMoviesError/RelatedMoviesError"
import SingleRelatedAnime from "../SingleRelatedAnime/SingleRelatedAnime"

function RelatedAnime() {
  const [relatedAnime, setRelatedAnime] = useState([])
  const [fetchStatus, setFetchStatus] = useState("loading")

  const {animeId} = useParams()
  
  useEffect(()=>{
    getRelatedAnime(animeId)
  }, [animeId])

  async function getRelatedAnime(id){
    try{
      setFetchStatus("loading")
      const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/anime/${id}/related`)
  
      const fetchInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("err", {cause : fetchInJson})
      }
      setRelatedAnime(fetchInJson)
      setFetchStatus("completed")
    }
    catch(err){
      setFetchStatus("error")
    }
  }

  const mappedRelatedAnime = relatedAnime.map(({id, name, poster_path, first_air_date})=>{
    return <SingleRelatedAnime 
    key={id}
    animeId={id}
    name={name}
    image={poster_path}
    date={first_air_date}
    />
  })
  return (
    <div className="related-anime">
            <h1 className="other-heading">Related Anime</h1>
                { 
                fetchStatus == "completed" && <div className="related-anime-container">
                  <div className="related-anime-container-inner">
                    {mappedRelatedAnime}
                  </div>
                </div>
                }
                {
                  fetchStatus == "loading" && <RelatedMoviesSkeleton />
                }
                {
                  fetchStatus == "error" && <RelatedMoviesError content={"anime"} refreshFromError={getRelatedAnime} />
                }
    </div>
  )
}

export default RelatedAnime