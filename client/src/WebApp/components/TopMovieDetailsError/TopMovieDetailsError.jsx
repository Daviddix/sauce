import alertIcon from "../../../assets/app assets/icons/attention-icon.svg"
import "./TopMovieDetailsError.css"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"

function TopMovieDetailsError({handleBackButton, refreshFromError}) {
  return (
    <>
    <div className="top-movie-details-header">
                 <button 
                 onClick={handleBackButton}
                 className="transparent-button">
                    <img src={backIcon} alt="go back" />
                </button>
            </div>

            <div className="top-movie-image error">
            </div>
            
              
    <div className="top-movie-details-error">
      <div className="left">
        <div className="left-circle">
          <img src={alertIcon} alt="alert icon" />
        </div>
      </div>

      <div className="right">
        <p className="other-heading">Failed to get movie info</p>

        <p className="body-style">
          Oops, seems like an error ocurred when trying to get information about this movie
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
    </>
  )
}

export default TopMovieDetailsError