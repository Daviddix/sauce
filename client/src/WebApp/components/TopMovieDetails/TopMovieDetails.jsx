import {Link} from "react-router-dom"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import timeIcon from "../../../assets/app assets/icons/time-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"
import testImage from "../../../assets/app assets/images/test.jpg"

import "./TopMovieDetails.css"


function TopMovieDetails() {
  return (
    <div className="top-movie-details">
            <div className="top-movie-details-header">
                <Link to="/app">
                 <button className="transparent-button">
                    <img src={backIcon} alt="go back" />
                </button>
                </Link>
               

                <div className="right">
                    <button className="transparent-button"><img src={tvIcon} alt="go back" /></button>
                    <button className="transparent-button"><img src={plusIcon} alt="go back" /></button>
                </div>
            </div>

            <div className="top-movie-image">
            <img src={testImage} alt="" />
            </div>
            

            <div className="top-movie-details-info">
                <div className="movie-name-and-stats">
                    <h1 className="tight-heading-style">The Adam Project(2019)</h1>

                    <div className="movie-stats">
                        <div className="rating">
                            <img src={starIcon} alt="star" />
                            <p className="tiny-body">7.8/10</p>
                        </div>

                        <div className="length">
                            <img src={timeIcon} alt="clock icon" />
                            <p className="tiny-body">2hrs 30mins</p>
                        </div>

                        <div className="accuracy">
                            <img src={rankIcon} alt="ranking" />
                            <p className="tiny-body">62%</p>
                        </div>
                    </div>
                </div>

                <div className="movie-description">
                    <h1 className="subheading">Overview</h1>

                    <p className="sub-body-style">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, eum iste? Adipisci quis necessitatibus eos libero totam odio tempora, quia commodi voluptates sequi veritatis, excepturi impedit enim quod nobis magni? Maiores nobis commodi voluptatum totam culpa voluptas dicta inventore doloremque aperiam voluptate magnam, illo itaque. Consequatur ad quidem esse, corrupti quis sapiente repellendus at nisi tempore molestias cupiditate ipsam nemo quia dolorem et, enim tenetur natus, deserunt quos aperiam. Error.</p>
                </div>

                <div className="movie-genre">
                    <h1 className="subheading">Genre</h1>
                    <div className="genre-container">

                    <div className="button-text-style">Sci-fi</div>
                    <div className="button-text-style">Thriller</div>
                    <div className="button-text-style">Adventure</div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TopMovieDetails