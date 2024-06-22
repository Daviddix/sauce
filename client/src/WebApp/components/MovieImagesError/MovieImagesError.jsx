import alertIcon from "../../../assets/app assets/icons/attention-icon.svg"
import "./MovieImagesError.css"

function MovieImagesError({refreshFromError}) {
  return (
    <div className="images-section error">
      <h1 className="subheading">Images</h1>
        <div
        className="main-image" />
       <div className="movie-images-error">
      <div className="left">
        <div className="left-circle">
          <img src={alertIcon} alt="alert icon" />
        </div>
      </div>

      <div className="right">
        <p className="other-heading">Failed to get movie images</p>

        <p className="body-style">
          Oops, seems like an error ocurred when trying to get images from this movie
          . Don't worry, just click the "Retry" button and it will fix
          it up.
        </p>

        <button
          onClick={() => {
            refreshFromError()
          }}
          className="secondary-button button-text-style"
        >
          Retry
        </button>
      </div>
    </div>
      </div>
  )
}

export default MovieImagesError