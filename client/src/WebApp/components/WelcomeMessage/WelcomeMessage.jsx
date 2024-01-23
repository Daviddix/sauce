import logo from "../../../assets/app assets/icons/logo.svg"
import "./WelcomeMessage.css"

function WelcomeMessage() {
  return (
    <div className="welcome">
                    <img src={logo} alt="sauce logo" className="sauce-logo" />
                    <h1 className="tight-heading-style">Sauce</h1>
                    <p className="sub-body-style">Hi and welcome to Sauce! Think of me as your friendly movie companion. Can't quite remember a movie? Share some basic details and i'll find your forgotten movie 😄</p>
                </div>
  )
}

export default WelcomeMessage