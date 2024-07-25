import "./UserPrompt.css"
import editIcon from "../../../assets/app assets/icons/edit-icon.svg"
import redoIcon from "../../../assets/app assets/icons/redo-icon.svg"
import { useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { inputValueFromEditAtom, messagesAtom, gptToRefreshAtom, userInfoAtom, disableInputAtom } from "../../globals/atom"


function UserPrompt({prompt, id, searchCategory}) {
  const mainDivRef = useRef(null)
  const [inputValueFromEdit, setInputValueFromEdit] = useAtom(inputValueFromEditAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [gptToRefresh, setGptToRefresh] = useAtom(gptToRefreshAtom)
  const [disabledInput] = useAtom(disableInputAtom)

  useEffect(()=>{
    mainDivRef.current.scrollIntoView({block: "start", inline: "nearest", behavior : "smooth"})
  }, [])

  return (
    <div ref={mainDivRef} className="user-prompt">
      {userInfo.profilePicture && <img src={userInfo.profilePicture} alt="your profile picture" className="user-profile-picture" />}
      {!userInfo.profilePicture && <div className="fake-img"></div>}

      <div className="prompt-text-and-edit">
        <p className="sub-body-style">{prompt}</p>

        
        <button
          onClick={() => {
            setInputValueFromEdit(prompt)
          }}
          disabled={disabledInput}
          className="edit"
        >
          <img src={editIcon} alt="edit icon" className="edit-icon" />
        </button>

        <button
          onClick={() => {
            const { key } = messages.filter(
              (message) => message.key == id && message.from == "GPT"
            )[0]
            setGptToRefresh(key)
          }}
          disabled={disabledInput}
          className="redo"
        >
          <img src={redoIcon} alt="redo icon" className="redo-icon" />
        </button>
    

      </div>
    </div>
  );
}

export default UserPrompt