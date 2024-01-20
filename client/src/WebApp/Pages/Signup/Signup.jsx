import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import eyeIcon from "../../../assets/app assets/icons/eye-icon.svg"
import {Link} from "react-router-dom"
import "./Signup.css"

function Signup() {
  return (
    <main className="signup-main">
      <button className="signup-back-container back-button-container">
        <Link to="/">
        <img src={backIcon} alt="go back" />
        </Link>
      </button>

      <div className="signup-details-container">
        <h1 className="tight-heading-style">Create a new account to get started</h1>

        <form className="signup-form">
          <div className="username-container">
            <label htmlFor="username" className="input-label">
              Username
            </label>

            <input type="text" placeholder="John Doe" className="text-input" />
          </div>

          <div className="password-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>

            <input type="text" className="text-input" />
            <img src={eyeIcon} alt="reveal password" className="eye" />
          </div>

          <button type="submit" className="primary-button button-text-style">
            signup
          </button>

          <p>
            Already have an account? <Link to="/app/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Signup