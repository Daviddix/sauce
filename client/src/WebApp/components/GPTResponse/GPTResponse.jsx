import "./GPTResponse.css" 
import testImage from "../../../assets/app assets/images/test.jpg"
import rightArrowIcon from "../../../assets/app assets/icons/long-right-arrow-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import tvIcon from "../../../assets/app assets/icons/tv-icon.svg"
import retryIcon from "../../../assets/app assets/icons/retry-icon.svg"
import RelatedMovies from "../RelatedMovies/RelatedMovies"


function GPTResponse() {
  return (
    <div className="gpt-response-container">
        <h1>Top Result(95%)</h1>
        <div className="movie-image-and-details">
        <div className="movie-image">
            <img src={testImage} alt="" />
        </div>

        <div className="movie-details">
            <div className="heading-and-rating">
                <h1 className="tight-heading-style">Predestination(2014)</h1>
                <small>• 7.8 / 10</small>
            </div>

            <p className="movie-description sub-body-style">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolor nostrum cumque impedit similique. Porro amet culpa, perferendis nisi aut obcaecati eligendi quisquam impedit necessitatibus delectus dolore soluta, nesciunt voluptatum expedita! Quisquam, magni! Numquam fugit nam debitis laborum dignissimos sed magnam illum sequi, odit tenetur tempora! Corporis quis numquam inventore quisquam placeat expedita molestiae velit obcaecati dolores eius asperiores tenetur autem similique accusantium, voluptatem culpa aliquid quo modi ut. Ut.
            </p>

            <div className="movie-options">
                <button className="button-text-style primary-button">
                    About this movie
                    <img src={rightArrowIcon} alt="right arrow icon" />
                </button>

                <button className="button-text-style secondary-button">
                <img src={plusIcon} alt="add icon" />
                    Add to List
                </button>

                <button className="button-text-style secondary-button">
                <img src={tvIcon} alt="tv icon" />
                    Watch Now
                </button>

                <button className="button-text-style secondary-button">
                <img src={retryIcon} alt="retry icon" />
                    Retry Search
                </button>
            </div>
        </div>
        </div>

        <RelatedMovies />
        
    </div>
  )
}

export default GPTResponse