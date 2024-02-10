import alertIcon from "../../../assets/app assets/icons/attention-icon.svg"

import "./AddToListModalError.css"

function AddToListModalError({refreshFunction}) {
  return (
    <div className="list-error-component">
                    <div className="left">
                        <div className="left-circle">
                        <img src={alertIcon} alt="alert icon" />
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="error-heading sub-sub-heading">An error ocurred</h1>
                        <p className="tiny-body">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi minus doloribus temporibus voluptatibus ab quae saepe esse reiciendis velit dolore.</p>

                        <button 
                        onClick={()=>{
                          refreshFunction()
                        }}
                        className="secondary-button button-text-style">Retry</button>
                    </div>
                </div>
  )
}

export default AddToListModalError