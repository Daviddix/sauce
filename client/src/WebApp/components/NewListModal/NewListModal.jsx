import addListIcon from "../../../assets/app assets/icons/add-list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"

import "./NewListModal.css"

function NewListModal() {
  return (
    <div className="add-list-modal">
            <div className="add-list-modal-header">
                <img src={addListIcon} alt="list icon" />

                    <h2 className="sub-sub-heading">New List</h2>

                <button>
                <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            <div className="add-list-modal-body">
                <form>
                    <label className="input-label" htmlFor="new-list">List Name</label>
                    <br />
                    <input className="text-input" type="text" />

                    <button className="primary-button button-text-style">
                        Add to this List
                    </button>
                </form>
            </div>
        </div>
  )
}

export default NewListModal