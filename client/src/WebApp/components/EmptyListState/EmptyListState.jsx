import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import emptyListState from "../../../assets/app assets/icons/empty-list-state.svg"


import "./EmptyListState.css"

function EmptyListState({setShowAddNewListModal}) {
  return (
    <div className="empty-list-state">
                    <img src={emptyListState} alt="empty list illustration" />
                    <h2 className="other-heading">No Lists yet</h2>
                    <p>Seems like you don't have any Lists yet, click the "New List" button to create a new List</p>

                    <button 
                    onClick={()=>{
                      setShowAddNewListModal(true)
                    }}
                    className="add-new-list button-text-style">
                    <img src={plusIcon} alt="plus icon" />
                    New List
                </button>    
                </div>
  )
}

export default EmptyListState