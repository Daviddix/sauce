import sauceLogo from '../assets/landing page assets/icons/logo.svg'
import webAppImage from "../assets/landing page assets/images/new.png"
import menuIcon from "../assets/landing page assets/icons/hamburger-button.svg"
import "./LandingPage.css"
import {Link} from "react-router-dom"

function LandingPage() {
  return (
    <main className='landing-page-main'>
        <header className="landing-page-header">
            <nav>
                <img src={sauceLogo} alt="logo" className='logo' />

                <div className="buttons">
                    
                    <Link>
                    <button>Login</button>                    
                    </Link>

                    <Link>
                    <button>Signup</button>
                    </Link>
                </div>

                <img src={menuIcon} alt="menu icon" className='menu-icon' />
            </nav>
        </header>
        
        <h1 className="heading">Find Movies You've Forgotten <span className='gradient'>Using AI</span></h1>

        <p className="sub-heading">Sauce uses advanced AI to dig up your fuzzy movie memories. No more forgetting! Rediscover your favorite films with a touch of AI magic. Movie time, reinvented just for you</p>

        <div className="body-buttons">
            <Link to="/app/login">
            <button className='button-secondary'>Login</button>
            </Link>

            <Link to="/app/signup">
            <button className='button-primary'>Signup</button>
            </Link>                    
        </div>

        <img src={webAppImage} alt="image of the sauce webapp" className="webapp-image" />
    </main>
  )
}

export default LandingPage