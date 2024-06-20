import RelatedMovies from "../../components/RelatedMovies/RelatedMovies"


import "./MovieDetails.css"
import TopMovieDetails from "../../components/TopMovieDetails/TopMovieDetails"
import Thriller from "../../components/Thriller/Thriller"
import Images from "../../components/Images/Images"
import More from "../../components/More/More"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function MovieDetails() {
  const {movieId} = useParams()

  useEffect(()=>{
    window.scroll({
      top:0,
      left:0,
      behavior : "smooth"
  })
  }, [movieId])
  return (
    <main className="movie-details-layout">
        <TopMovieDetails />

        <div className="other-movie-details">
            <Thriller />

            <Images />

            
            <More />

            <RelatedMovies />
        </div>
    </main>
  )
}

export default MovieDetails