import testListImage from "../../../assets/app assets/images/test.jpg"
import "./UserPrompt.css"
import editIcon from "../../../assets/app assets/icons/edit-icon.svg"
import redoIcon from "../../../assets/app assets/icons/redo-icon.svg"
import { useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { inputValueFromEditAtom, messagesAtom, gptToRefreshAtom } from "../../globals/atom"


function UserPrompt({prompt, id}) {
  const mainDivRef = useRef(null)
  const [inputValueFromEdit, setInputValueFromEdit] = useAtom(inputValueFromEditAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [gptToRefresh, setGptToRefresh] = useAtom(gptToRefreshAtom)

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

                    <button 
                    onClick={()=>{
                      setInputValueFromEdit(prompt)
                    }}
                    className="edit">
                      <img src={editIcon} alt="edit icon" className="edit-icon" />
                    </button>

                    <button 
                    onClick={()=>{
                      console.log(messages)
                      const {key} = messages.filter((message)=> message.key == id && message.from == "GPT")[0]
                      setGptToRefresh(key)
                    }}
                    className="redo">
                      <img src={redoIcon} alt="redo icon" className="redo-icon" />
                    </button>
                  </div>
     </div>
  )
}

export default UserPrompt