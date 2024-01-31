import listIcon from "../../../assets/app assets/icons/list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import SingleList from "../SingleList/SingleList"
import emptyListState from "../../../assets/app assets/icons/empty-list-state.svg"
import "./AddToListModal.css"


function AddToListModal() {
  return (
    <div className="list-modal-overlay">
        <div className="list-modal">
            <div className="list-modal-header">
                <img src={listIcon} alt="list icon" />

                <div className="list-header-text">
                    <h2 className="sub-sub-heading">Add to list</h2>
                    <p className="sub-body-style">Please select a list to add this movie to</p>
                </div>

                <button>
                <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            <div className="list-modal-body">
                <>
                <SingleList />

                <button className="add-new-list">
                    <img src={plusIcon} alt="plus icon" />
                    New List
                </button>
                </>
            </div>

            <div className="list-modal-bottom">
                    <button className="button-text-style primary-button">Add to this List</button>
            </div>
        </div>
    </div>
  )
}

export default AddToListModal