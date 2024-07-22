import { useEffect, useState } from "react"
import "./RelatedTvShows.css"
import { useParams } from "react-router-dom"
import RelatedMoviesSkeleton from "../SkeletonLoaders/RelatedMoviesSkeleton/RelatedMoviesSkeleton"
import RelatedMoviesError from "../RelatedMoviesError/RelatedMoviesError"
import SingleRelatedTvShow from "../SingleRelatedTvShow/SingleRelatedTvShow"

function RelatedAnime() {
  const [relatedTvShows, setRelatedTvShows] = useState([])
  const [fetchStatus, setFetchStatus] = useState("loading")

  const {tvShowId} = useParams()
  
  useEffect(()=>{
    getRelatedTvShows(tvShowId)
  }, [tvShowId])

  async function getRelatedTvShows(id){
    try{
      setFetchStatus("loading")
      const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/tv/${id}/related`)
  
      const fetchInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("err", {cause : fetchInJson})
      }
      setRelatedTvShows(fetchInJson)
      setFetchStatus("completed")
    }
    catch(err){
      setFetchStatus("error")
    }
  }

  const mappedRelatedTvShows = relatedTvShows.map(({id, name, poster_path, first_air_date})=>{
    return <SingleRelatedTvShow 
    key={id}
    tvShowId={id}
    name={name}
    image={poster_path}
    date={first_air_date}
    />
  })
  return (
    <div className="related-tv-shows">
            <h1 className="other-heading">Related TV Shows</h1>
                { 
                fetchStatus == "completed" && <div className="related-tv-shows-container">
                  <div className="related-tv-shows-container-inner">
                    {mappedRelatedTvShows}
                  </div>
                </div>
                }
                {
                  fetchStatus == "loading" && <RelatedMoviesSkeleton />
                }
                {
                  fetchStatus == "error" && <RelatedMoviesError content={"tv shows"} refreshFromError={getRelatedTvShows} />
                }
    </div>
  )
}

export default RelatedAnime