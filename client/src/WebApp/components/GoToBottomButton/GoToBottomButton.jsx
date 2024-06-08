import downArrowIcon from "../../../assets/app assets/icons/down-arrow-icon.svg"

import "./GoToBottomButton.css"

function GoToBottomButton({refToScroll, setShowDownButton}) {

    function scrollToBottomOfChatSection(){
        const bottom = refToScroll.current.scrollHeight

        refToScroll.current.scroll({
            top : bottom,
            behavior : "smooth"
        })
    }
  return (
    <div className="main-go-to">
      <button 
      onClick={()=>{
        scrollToBottomOfChatSection()
      }}
      className="go-to-bottom transparent-button">
        <img src={downArrowIcon} 
        alt="dawn arrow" 
        />
      </button>
    </div>
  )
}

export default GoToBottomButton