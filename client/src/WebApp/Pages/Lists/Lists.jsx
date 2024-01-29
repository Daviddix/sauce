import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import deleteIcon from "../../../assets/app assets/icons/delete-icon.svg"
import {Link} from "react-router-dom"
import "./Lists.css"
import SingleListMovie from "../../components/SingleListMovie/SingleListMovie"


function Lists() {
  return (
    <div className='list-layout'>
        <div className="list-header">
        <button className="back-button-container">
        <Link to="/app">
        <img src={backIcon} alt="go back" />
        </Link>
      </button>

      <h1 className="tight-heading-style">Memories(4)</h1>

      <button className="back-button-container">
        <img src={deleteIcon} alt="go back" />
      </button>
        </div>

        <div className="list-movie-container">
            <SingleListMovie />            
        </div>
    </div>
  )
}

export default Lists