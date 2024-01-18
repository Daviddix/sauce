import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import eyeIcon from "../../../assets/app assets/icons/eye-icon.svg"

function Login() {
  return (
    <main className="login-main">
      <div className="login-back-container back-button-container">
        <Link to="/">
        <img src={backIcon} alt="go back" />
        </Link>
      </div>

      <div className="login-details-container">
        <h1 className="tight-heading-style">Welcome back to Sauce</h1>

        <form className="login-form">
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
            Login
          </button>

          <p>
            Don't have an account? <Link to="/app/signup">Signup</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login