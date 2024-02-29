import RelatedMovies from "../../components/RelatedMovies/RelatedMovies"


import "./MovieDetails.css"
import TopMovieDetails from "../../components/TopMovieDetails/TopMovieDetails"
import Thriller from "../../components/Thriller/Thriller"
import MovieImages from "../../components/MovieImages/MovieImages"
import More from "../../components/More/More"

function MovieDetails() {
  return (
    <main className="movie-details-layout">
        <TopMovieDetails />

        <div className="other-movie-details">
            <Thriller />

            <MovieImages />

            
            <More />

            <RelatedMovies />
        </div>
    </main>
  )
}

export default MovieDetails