import sauceLogo from '../assets/landing page assets/icons/logo.svg'
import webAppImage from "../assets/landing page assets/images/sauce-desktop-mockup.png"
import webAppImageMobile from "../assets/landing page assets/images/sauce-mobile-mockup.png"
import menuIcon from "../assets/landing page assets/icons/hamburger-button.svg"
import closeIcon from "../assets/landing page assets/icons/close-one.svg"
import buyMeCoffeeImage from "../assets/landing page assets/icons/bmc-button.svg"
import rightArrowIcon from "../assets/landing page assets/icons/arrow-right-icon.svg"
import "./LandingPage.css"
import {Link} from "react-router-dom"
import { useEffect, useRef, useState } from 'react'

function LandingPage() {
    const [showMenu, setShowMenu] = useState(false)
    const [category, setCategory] = useState("Movies")
    const categories = ["Movies", "TV Shows", "Anime"]
    const spanRef = useRef()


    function getNewCategory(){
        
        if(category == "Movies"){
            return setCategory(categories[1])
        }else if(category == "TV Shows"){
            return setCategory(categories[2])
        }else if(category == "Anime"){
            return setCategory(categories[0])
        }
    }

    useEffect(()=>{
        spanRef.current.classList.remove("slide")
        void spanRef.current.offsetWidth
        spanRef.current.classList.add("slide")
        const i = setInterval(()=>{
            getNewCategory()
        }, 7000)

        return ()=>{
            clearInterval(i)
        }
    }, [category])
    
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

                    <a target='_blank' href="https://buymeacoffee.com/david05">
                    <img src={buyMeCoffeeImage} alt="donate to dev" className='bmc-logo'/>                   
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

                    <a target='_blank' href="https://buymeacoffee.com/david05">
                    <img src={buyMeCoffeeImage} alt="donate to dev" className='bmc-logo'/>                   
                    </a>
                </div>

                <img src={menuIcon} alt="menu icon" 
                onClick={()=>{
                    setShowMenu(true)
                }}
                className='menu-icon' />
            </nav>
        </header>
        
        <h1 className="heading">Find <span ref={spanRef} className="slide">{category}</span> You've Forgotten <span className='gradient'>Using AI</span></h1>

        <p className="sub-heading">Introducing Sauce, an AI-powered web app that helps you find Anime, TV Shows and Movies you've forgotten with just a brief, imperfect description. Reconnect with lost memories effortlessly</p>

        <div className="body-buttons">
            <Link to="/app/login">
            <button className='button-secondary'>Login</button>
            </Link>

            <Link to="/app">
            <button className='button-primary'>
                Get Started
                <img src={rightArrowIcon} alt="right arrow" />
                </button>
            </Link>                    
        </div>

        <img src={webAppImage} alt="image of the sauce webapp" className="webapp-image pc" />

        <img src={webAppImageMobile} alt="image of the sauce webapp" className="webapp-image mobile" />
    </main>
  )
}

export default LandingPage