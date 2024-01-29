import testImage from "../../../assets/app assets/images/test.jpg"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import "./SingleListMovie.css"

function SingleListMovie() {
  return (
    <div className="single-list-movie">
                <img src={testImage} alt="" />
                <div className="single-list-movie-details">
                    <h1 className="list-movie-title">Predestination(2014)</h1>

                    <div className="list-movie-options">
                        <button>Delete</button>
                        <button className="c">More  Info 
                            <img src={rightArrowIcon} alt="" />

                        </button>
                    </div>
                </div>
            </div>
  )
}

export default SingleListMovie