import testImage from "../../../assets/app assets/images/test.jpg"
import "./SingleRelatedMovie.css"

function SingleRelatedMovie() {
  return (
    <div className="single-related-movie">
                        <img src={testImage} alt="" />
                        <h1 className="sub-other-heading">
                            Interstellar(2014)
                        </h1>
                    </div>
  )
}

export default SingleRelatedMovie