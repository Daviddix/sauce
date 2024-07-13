import logo from "../../../assets/app assets/icons/logo.svg"
import "./WelcomeMessage.css"

function WelcomeMessage() {
  return (
    <div className="welcome">
                    <img src={logo} alt="sauce logo" className="sauce-logo" />
                    <h1 className="tight-heading-style">Sauce</h1>
                    <p className="sub-body-style">
                    Hello and welcome to Sauce! I'm here to be your helpful companion for movies, anime, or TV shows. If you can't quite recall a specific one, just share some details and I'll track down your forgotten favorite! 😄</p>

                    <span className="sub-body-style">Powered by <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg" alt="tmdb logo" />
                    </span>
                </div>
  )
}

export default WelcomeMessage