import testListImage from "../../../assets/app assets/images/test.jpg"
import "./UserPrompt.css"
import editIcon from "../../../assets/app assets/icons/edit-icon.svg"


function UserPrompt() {
  return (
    <div className="user-prompt">
                  <img src={testListImage} alt="" className="user-profile-picture" />

                  <div className="prompt-text-and-edit">
                    <p className="sub-body-style">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aspernatur aut maxime quas tempore libero explicabo ea consectetur recusandae harum. Numquam consectetur illo mollitia sunt perferendis nobis officia architecto sit?
                    </p>

                    <button className="edit">
                      <img src={editIcon} alt="edit icon" className="edit-icon" />
                    </button>
                  </div>
                </div>
  )
}

export default UserPrompt