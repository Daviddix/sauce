import { Link } from "react-router-dom"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import "./NotAuthenticatedModal.css"

function NotAuthenticatedModal({setShowNotAuthenticatedModal}) {
  return (
    <div className="not-authenticated-modal-overlay">
        <div className="not-authenticated-modal">
            <div className="not-authenticated-modal-header">

                    <h2 className="sub-sub-heading">You'll need an account to use that feature</h2>

                <button onClick={()=>{
                  setShowNotAuthenticatedModal(false)
                }}>
                <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            <div className="not-authenticated-modal-body">

                    <Link to="/app/signup">
                    <button className="primary-button button-text-style">
                       Signup
                    </button>
                    </Link>
                    <h2 className="sub-sub-heading">OR</h2>

                    <Link to="/app/login">
                    <button className="secondary-button button-text-style">
                       Login
                    </button>
                    </Link>
            </div>
        </div>
    </div>
  )
}

export default NotAuthenticatedModal