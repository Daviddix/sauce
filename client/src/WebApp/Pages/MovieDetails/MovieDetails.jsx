import RelatedMovies from "../../components/RelatedMovies/RelatedMovies"
import plusIconButton from "../../../assets/app assets/icons/plus-icon.svg"
import tvIconButton from "../../../assets/app assets/icons/tv-icon.svg"
import plusIcon from "../../../assets/app assets/icons/headerPlusIcon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import starIcon from "../../../assets/app assets/icons/star-icon.svg"
import timeIcon from "../../../assets/app assets/icons/time-icon.svg"
import rankIcon from "../../../assets/app assets/icons/ranking-list-icon.svg"
import linkArrowIcon from "../../../assets/app assets/icons/link-arrow-icon.svg"
import testImage from "../../../assets/app assets/images/test.jpg"
import "./MovieDetails.css"

function MovieDetails() {
  return (
    <main className="movie-details-layout">
        <div className="top-movie-details">
            <div className="top-movie-details-header">
                <button className="transparent-button">
                    <img src={backIcon} alt="go back" />
                </button>

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

        <div className="other-movie-details">
            <div className="movie-thriller-section">
                <h1 className="subheading">Thriller</h1>

                <div className="video"></div>
            </div>

            <div className="movie-images-section">
                <h1 className="subheading">Images</h1>
                <img src={testImage} alt="" className="main-image" />

                <div className="other-images-container">
                    <img src={testImage} alt="" />
                    <img src={testImage} alt="" />
                    <img src={testImage} alt="" />
                    <img src={testImage} alt="" />
                    <img src={testImage} alt="" />
                    <img src={testImage} alt="" />
                </div>
            </div>

            <div className="movie-more-section">
                <h1 className="subheading">More</h1>

                <div className="more-button-container">
                <button className="button-text-style primary-button">More Info About this Movie
                <img src={linkArrowIcon} alt="arrow icon" />
                </button>

                <button className="button-text-style secondary-button">
                <img src={plusIconButton} alt="add icon" />
                    Add to List
                </button>

                <button className="button-text-style secondary-button">
                <img src={tvIconButton} alt="tv icon" />
                    Watch Now
                </button>
                </div>
            </div>
            

        <RelatedMovies />
        </div>
    </main>
  )
}

export default MovieDetails