import "./MovieDetailsSkeleton.css"

function MovieDetailsSkeleton() {
  return (
    <>

    <div className="top-movie-image skeleton">

    </div>
    

    <div className="top-movie-details-info skeleton">
        <div className="movie-name-and-stats">
            <div className="movie-name"></div>

            <div className="movie-stats skeleton">
                <div className="rating">
                    
                </div>

                <div className="length">
                    
                </div>

                <div className="accuracy">
                    
                </div>
            </div>
        </div>

        <div className="movie-description skeleton">
            <div className="overview"></div>

            <div className="overview-text"></div>
            <div className="overview-text"></div>
            <div className="overview-text"></div>
            <div className="overview-text"></div>
            <div className="overview-text"></div>
        </div>

        <div className="movie-genre skeleton">

            <div className="genre-heading"></div>
            
            <div className="genre-container">
            <div className="single-genre"></div>
            <div className="single-genre"></div>
            <div className="single-genre"></div>

            </div>
        </div>
    </div>
    </>
  )
}

export default MovieDetailsSkeleton