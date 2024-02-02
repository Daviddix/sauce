import testListImage from "../../../assets/app assets/images/test.jpg"
import "./UserPrompt.css"
import editIcon from "../../../assets/app assets/icons/edit-icon.svg"
import { useEffect, useRef } from "react"


function UserPrompt({prompt}) {
  const mainDivRef = useRef(null)

  useEffect(()=>{
    mainDivRef.current.scrollIntoView({block: "start", inline: "nearest", behavior : "smooth"})
  }, [])
  return (
    <div ref={mainDivRef} className="user-prompt">
                  <img src={testListImage} alt="" className="user-profile-picture" />

                  <div className="prompt-text-and-edit">
                    <p className="sub-body-style">
                      {prompt}
                    </p>

                    <button className="edit">
                      <img src={editIcon} alt="edit icon" className="edit-icon" />
                    </button>
                  </div>
     </div>
  )
}

export default UserPrompt