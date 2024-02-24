import downArrowIcon from "../../../assets/app assets/icons/down-arrow-icon.svg"

import "./GoToBottomButton.css"

function GoToBottomButton(refToScroll) {

    function scrollToBottomOfChatSection(){
        const bottom = refToScroll.refToScroll.scrollWidth 

        refToScroll.refToScroll.scroll({
            top : bottom,
            behavior : "smooth"
        })
    }
  return (
    <button 
    onClick={scrollToBottomOfChatSection}
    className="go-to-bottom transparent-button">
      <img src={downArrowIcon} 
      alt="dawn arrow" 
      />
    </button>
  )
}

export default GoToBottomButton