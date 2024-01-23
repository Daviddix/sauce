import SingleRelatedMovie from "../SingleRelatedMovie/SingleRelatedMovie"
import "./RelatedMovies.css"

function RelatedMovies() {
  return (
    <div className="related-movies">
            <h1 className="other-heading">Related Movies</h1>
                <div className="single-related-movie-container">
                    <SingleRelatedMovie />
                </div>
            
        </div>
  )
}

export default RelatedMovies