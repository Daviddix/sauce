import "./MovieImagesSkeleton.css"

function MovieImagesSkeleton() {
  return (
    <div className="images-section-skeleton">
      <h1 className="subheading">Images</h1>
        <div className="main-image-skeleton">
        </div>

      <div className="other-images-container-skeleton">
          <div className="other-image-skeleton"></div>
          <div className="other-image-skeleton"></div>
          <div className="other-image-skeleton"></div>
          <div className="other-image-skeleton"></div>
          <div className="other-image-skeleton"></div>
      </div>
      
      </div>
  )
}

export default MovieImagesSkeleton