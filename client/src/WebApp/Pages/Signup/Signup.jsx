import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import eyeIcon from "../../../assets/app assets/icons/eye-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-2-icon.svg"
import userIcon from "../../../assets/app assets/icons/user-icon.svg"
import {Link, useNavigate} from "react-router-dom"
import "./Signup.css"
import { useEffect, useRef, useState } from "react"

function Signup() {
  const inputRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [creatingUser, setCreatingUser] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [imageError, setImageError] = useState("")

  const navigate = useNavigate()

  function triggerFileInput() {
    inputRef.current.click();
  }

  function addProfileImage(e) {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target.result
        const base64Image = e.target.result.split(",")[1]
        setProfileUrl(imageUrl)
        setProfilePicture(base64Image)
      }

      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      username,
      password,
      profilePicture
    }
    if (profileUrl == "") {
      return alert("please add a profile picture")
    }
    try {
      setCreatingUser(true)
      const signUpResponse = await fetch("http://localhost:3000/app/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const jsonResponse = await signUpResponse.json()
      if (!signUpResponse.ok) {
        throw Error("err", { cause: jsonResponse })
      }
      setCreatingUser(false)
      navigate("/app")
    }
    catch (err) {
      setCreatingUser(false)
      const reasonForError = err.cause.reason 
      if (reasonForError == "duplicate username") {
        setUsernameError(err.cause.message)
      }else if (reasonForError == "image upload") {
      setImageError(err.cause.message)
    } else{
        alert("an error ocurred, please try again")
      }
    }
  }

  function goBack() {
    navigate(-1)
  }


  useEffect(()=>{
    document.title = "Sauce | Signup"
  }, [])
  return (
    <main className="signup-main">
      <button className="signup-back-container back-button-container">
        <Link to="/">
        <img src={backIcon} alt="go back" />
        </Link>
      </button>

      <div className="signup-details-container">
        <h1 className="tight-heading-style">Create a new account to get started</h1>

        <form 
        onSubmit={(e)=>{
          handleSubmit(e)
        }}
        className="signup-form">
        <div className="profile-picture-container">
            <label className="input-label" htmlFor="profilePicture">Profile Picture</label>

            <div className="profile-placeholder">
              <div 
              style={{ backgroundImage: `url(${profileUrl})` }}
              className="main-circle">
              {profileUrl == "" && <img src={userIcon} alt="your profile picture" />}
              </div>
              <div
                onClick={triggerFileInput}
                tabIndex={0}
                className="small-circle"
              >
                <img src={plusIcon} alt="" />
              </div>
            </div>

            {imageError !== "" && <p className="error">{imageError}</p>}
        </div>

          <div className="username-container">
            <label htmlFor="username" className="input-label">
              Username
            </label>

            <input 
            onChange = {(e)=>{
              setUsernameError("")
              setUsername(e.target.value)
            }}
            value={username}
            id="username"
            name="username"
            type="text" 
            required
            placeholder="John Doe" 
            className="text-input" />

          {usernameError !== "" && <p className="error">{usernameError}</p>}
          </div>

          <div className="password-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>

            <input 
            name="password"
            id="password" 
            required
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            type={showPassword? "text" : "password"}
            className="text-input" />

            <img 
            onClick={()=>{
              setShowPassword((prev) => !prev)
            }}
            src={eyeIcon} 
            alt="reveal password" 
            className="eye" />
          </div>

          <button 
          disabled={creatingUser? true : false}
          type="submit" className="primary-button button-text-style">
            {!creatingUser && "Signup"}
            {creatingUser && <div className="signup-loader"></div>}
          </button>

          <p>
            Already have an account? <Link to="/app/login">Login</Link>
          </p>
        </form>
      </div>

      <input 
      style={{display: "none"}}
      onChange={(e)=>{
        addProfileImage(e)
      }} ref={inputRef} type="file" name="" id="" />
    </main>
  )
}

export default Signup