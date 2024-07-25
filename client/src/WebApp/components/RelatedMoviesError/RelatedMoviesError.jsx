import "./RelatedMoviesError.css"
import alertIcon from "../../../assets/app assets/icons/attention-icon.svg"

function RelatedMoviesError({refreshFromError, content}) {
  return (
    <div className="related-movies-error">
      <div className="left">
        <div className="left-circle">
          <img src={alertIcon} alt="alert icon" />
        </div>
      </div>

      <div className="right">
        <p className="other-heading">Failed to get related {content}</p>

        <p className="body-style">
          Oops, seems like an error ocurred when trying to get related {content}
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
  )
}

export default RelatedMoviesError