import alertIcon from "../../../assets/app assets/icons/attention-icon.svg"
import "./TopMovieDetailsError.css"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"

function TopMovieDetailsError({handleBackButton, refreshFromError, content}) {
  return (
    <>
    <div className="top-details-header-error">
                 <button 
                 onClick={handleBackButton}
                 className="transparent-button">
                    <img src={backIcon} alt="go back" /> 
                </button>
            </div>

            <div className="top-image-error">
            </div>
            
              
    <div className="top-details-error">
      <div className="left">
        <div className="left-circle">
          <img src={alertIcon} alt="alert icon" />
        </div>
      </div>

      <div className="right">
        <p className="other-heading">Failed to get {content} info</p>

        <p className="body-style">
          Oops, seems like an error ocurred when trying to get information about this {content}
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