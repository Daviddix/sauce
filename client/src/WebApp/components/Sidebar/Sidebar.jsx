import "./Sidebar.css"
import listIcon from "../../../assets/app assets/icons/list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import rightArrowIcon from "../../../assets/app assets/icons/right-arrow-icon.svg"
import testListImage from "../../../assets/app assets/images/test.jpg"

function Sidebar() {
  return (
    <aside className="sidebar">
        <header className="list-header">
            <div className="list-header-inner">
              <div className="icon-and-heading">
              <img src={listIcon} alt="list icon" />

                <p className="sub-sub-heading">Your Lists</p>
              </div>

              <button className="close-sidebar">
                <img src={closeIcon} alt="close sidebar" />
              </button>
                
            </div>
        </header>

        <div className="lists-container">
          <div className="single-list">
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
        </div>

        <div className="profile-view-list">
            <img src="" alt="" className="profile-icon" />
            <p>Emmanuel Nsikan-David</p>
        </div>
    </aside>
  )
}

export default Sidebar