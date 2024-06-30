import sauceLogo from '../assets/landing page assets/icons/logo.svg'
import webAppImage from "../assets/landing page assets/images/sauce-desktop-mockup.png"
import webAppImageMobile from "../assets/landing page assets/images/sauce-mobile-mockup.png"
import menuIcon from "../assets/landing page assets/icons/hamburger-button.svg"
import closeIcon from "../assets/landing page assets/icons/close-one.svg"
import "./LandingPage.css"
import {Link} from "react-router-dom"
import { useEffect, useState } from 'react'
import ReactGA from "react-ga4";

ReactGA.initialize("G-BHR152TJYH");

function LandingPage() {
    const [showMenu, setShowMenu] = useState(false)

    useEffect(()=>{
        ReactGA.send({
          hitType: "pageview",
          page: "/home",
          title : "landing page"
        })
      }, [])
  return (
    <main className='landing-page-main'>

        <div className={showMenu? "menu-overlay" : "menu-overlay close"}>
            <img src={closeIcon} alt="close icon"
            className="close-icon"
            onClick={()=>{
                setShowMenu(false)
            }}
            />

            <div className="menu">
                    <a target='_blank' href="https://nsikandavid.dev">
                    <button>About the Dev ↗</button>                    
                    </a>
            </div>
        </div>
        <header className="landing-page-header">
            <nav>
                <img src={sauceLogo} alt="logo" className='logo' />

                <div className="buttons">
                    
                    <a target='_blank' href="https://nsikandavid.dev">
                    <button>About The Dev ↗</button>                    
                    </a>
                </div>

                <img src={menuIcon} alt="menu icon" 
                onClick={()=>{
                    setShowMenu(true)
                }}
                className='menu-icon' />
            </nav>
        </header>
        
        <h1 className="heading">Find Movies You've Forgotten <span className='gradient'>Using AI</span></h1>

        <p className="sub-heading">Introducing Sauce, an AI-powered web app, to find movies you've forgotten with just a brief, imperfect description. Reconnect with lost memories effortlessly</p>

        <div className="body-buttons">
            <Link to="/app/login">
            <button className='button-secondary'>Login</button>
            </Link>

            <Link to="/app/signup">
            <button className='button-primary'>Signup</button>
            </Link>                    
        </div>

        <img src={webAppImage} alt="image of the sauce webapp" className="webapp-image pc" />

        <img src={webAppImageMobile} alt="image of the sauce webapp" className="webapp-image mobile" />
    </main>
  )
}

export default LandingPage