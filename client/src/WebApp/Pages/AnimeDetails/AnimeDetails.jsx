import "./AnimeDetails.css"
import TopAnimeDetails from "../../components/TopAnimeDetails/TopAnimeDetails"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function AnimeDetails() {
  const {animeId} = useParams()

  useEffect(()=>{
    window.scroll({
      top:0,
      left:0,
      behavior : "smooth"
  })
  }, [animeId])
  return (
    <main className="anime-details-layout">
        <TopAnimeDetails />

        {/* <div className="other-anime-details">
            <Thriller />

            <MovieImages />

            
            <More />

            <RelatedMovies />
        </div> */}
    </main>
  )
}

export default AnimeDetails