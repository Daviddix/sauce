import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import eyeIcon from "../../../assets/app assets/icons/eye-icon.svg"
import eyeOffIcon from "../../../assets/app assets/icons/eye-off.svg"
import { useAtom } from 'jotai'
import { refreshUserDetailsAtom } from '../../globals/atom'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [creatingUser, setCreatingUser] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [refreshUserDetails, setRefreshUserDetails] = useAtom(refreshUserDetailsAtom)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      username,
      password
    }
    try {
      setCreatingUser(true)
      const loginResponse = await fetch("https://sauce-backend.onrender.com/app/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const jsonResponse = await loginResponse.json()
      if (!loginResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setCreatingUser(false)
      setRefreshUserDetails(true)
      navigate("/app")
    }
    catch (err) {
      setCreatingUser(false)
      const reasonForError = err.cause.reason 
      if (reasonForError == "user not found") {
        setUsernameError(err.cause.message)
      }
      else if(reasonForError == "wrong password"){
        setPasswordError(err.cause.message)
      }else{
        alert("an error ocurred, please try again")
      }
    }
  }

  function goBack() {
    navigate(-1)
  }

  useEffect(()=>{
    document.title = "Sauce | Login"
  }, [])

  return (
    <main className="login-main">
      <button 
      onClick={()=>{
        goBack()
      }}
      className="login-back-container back-button-container">
        <img src={backIcon} alt="go back" />
      </button>

      <div className="login-details-container">
        <h1 className="tight-heading-style">Welcome back to Sauce</h1>

        <form
        onSubmit={handleSubmit}
        className="login-form">
          <div className="username-container">
            <label htmlFor="username" className="input-label">
              Username
            </label>

            <input 
            id="username"
            required
            onChange={(e)=>{
              setUsernameError("")
              setUsername(e.target.value)
            }}
            value={username}
            type="text" placeholder="John Doe" className="text-input" />

            {usernameError !== "" && <p className="error">{usernameError}</p>}
          </div>

          <div className="password-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>

            <input 
            required
            id='password'
            onChange={(e)=>{
              setPasswordError("")
              setPassword(e.target.value)
            }}
            type={showPassword? "text" : "password"}
            value={password}
            className="text-input" />

            <img 
            onClick={()=>{
              setShowPassword((prev) => !prev)
            }}
            src={showPassword ? eyeOffIcon : eyeIcon} 
            alt="reveal password" 
            className="eye" />

          </div>
          {passwordError !== "" && <p className="error">{passwordError}</p>}

          <button 
          disabled={creatingUser}
          type="submit" 
          className="primary-button button-text-style">
            {!creatingUser && "Login"}
            {creatingUser && <div className="login-loader"></div>}
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