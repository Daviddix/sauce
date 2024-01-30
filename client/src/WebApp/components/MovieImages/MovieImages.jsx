import testImage from "../../../assets/app assets/images/test.jpg"
import "./MovieImages.css"

function MovieImages() {
  return (
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
  )
}

export default MovieImages