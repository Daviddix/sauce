import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import testListImage from "../../../assets/app assets/images/test.jpg"
import "./SingleList.css"

function SingleList() {
  return (
    <div tabIndex={0} className="single-list">
              <img src={testListImage} alt="bg" className="bg" />

            <div className="list-inner">
              <div className="list-name-number">
                <h2 className="sub-sub-heading">Memories</h2>
                <p className="sub-body-style">4 Movies</p>
              </div>

              <button className="view-list-button">
                <img src={rightArrowIcon} alt="view list" />
              </button>
            </div>
          </div>
  )
}

export default SingleList