import "./SingleListMovieError.css"
import alertIcon from "../../../assets/app assets/icons/attention-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import { Link } from "react-router-dom"

function SingleListMovieError({refreshFromError, content}) {
  return (
    <>
    <div className="list-header">
    <button className="back-button-container">
    <Link to="/app">
    <img src={backIcon} alt="go back" />
    </Link>
  </button>
    </div>

    <div className="single-list-movie-response-error">
        <div className="left">
                        <div className="left-circle">
                        <img src={alertIcon} alt="alert icon" />
                        </div>
            </div>

            <div className="right">
            <p className="other-heading">
            Failed to get {content} in this list
            </p>

            <p className="body-style">
            Oops, seems like an error ocurred when trying to get the {content} from this list. Don't worry, just click the "Retry" button and it will fix it up.
            </p>
            

            <button
            onClick={()=>{
                refreshFromError()
            }}
            className="secondary-button button-text-style">Retry</button>
            </div>
      </div> 
      </>
  )
}

export default SingleListMovieError