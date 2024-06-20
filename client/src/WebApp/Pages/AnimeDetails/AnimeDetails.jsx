import "./AnimeDetails.css"
import TopAnimeDetails from "../../components/TopAnimeDetails/TopAnimeDetails"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Thriller from "../../components/Thriller/Thriller"
import Images from "../../components/Images/Images"
import MoreAnime from "../../components/MoreAnime/MoreAnime"
import RelatedAnime from "../../components/RelatedAnime/RelatedAnime"

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

        <div className="other-anime-details">
            <Thriller />

            <Images />

            
            <MoreAnime />

            <RelatedAnime />
        </div>
    </main>
  )
}

export default AnimeDetails