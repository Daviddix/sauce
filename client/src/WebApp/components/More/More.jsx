import plusIconButton from "../../../assets/app assets/icons/plus-icon.svg"
import tvIconButton from "../../../assets/app assets/icons/tv-icon.svg"
import linkArrowIcon from "../../../assets/app assets/icons/link-arrow-icon.svg"

import "./More.css"

function More() {
  return (
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
  )
}

export default More