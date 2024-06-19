import "./DetailsSkeleton.css"

function MovieDetailsSkeleton() {
  return (
    <>

    <div className="top-image-skeleton">

    </div>
    

    <div className="top-details-info-skeleton">
        <div className="name-and-stats-skeleton">
            <div className="name"></div>

            <div className="stats skeleton">
                <div className="rating">
                    
                </div>

                <div className="length">
                    
                </div>

                <div className="accuracy">
                    
                </div>
            </div>
        </div>

        <div className="description-skeleton">
            <div className="overview"></div>

            <div className="overview-text"></div>
            <div className="overview-text"></div>
            <div className="overview-text"></div>
            <div className="overview-text"></div>
            <div className="overview-text"></div>
        </div>

        <div className="genre-skeleton">

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