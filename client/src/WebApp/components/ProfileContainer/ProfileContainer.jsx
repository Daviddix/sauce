import testListImage from "../../../assets/app assets/images/test.jpg"
import "./ProfileContainer.css"

function ProfileContainer() {
  return (
    <div className="profile-view-list">
          <div className="profile-view-list-inner">
          <img src={testListImage} alt="your profile picture" className="profile-icon" />
            <p className="sub-sub-heading">Emmanuel Nsikan-David</p>
          </div>
            
        </div>
  )
}

export default ProfileContainer