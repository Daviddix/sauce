import discoverIcon from "../../../assets/app assets/icons/discover-icon.svg";
import sendIcon from "../../../assets/app assets/icons/airplane-icon.svg";

import "./ChatInput.css";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { disableInputAtom, inputValueFromEditAtom, messagesAtom } from "../../globals/atom";
import { randomMovieDescription } from "../../globals/others";

function ChatInput() {
  const [typedDescription, setTypedDescription] = useState("")
  const [disableInput, setDisableInput] = useAtom(disableInputAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [inputValueFromEdit, setInputValueFromEdit] = useAtom(inputValueFromEditAtom)
  
  const randomIndex = Math.ceil(Math.random() * randomMovieDescription.length)

  useEffect(()=>{
    if(inputValueFromEdit !== ""){
      setTypedDescription(inputValueFromEdit)
      inputRef.current.focus()
    }
  }, [inputValueFromEdit])

  const inputRef = useRef(null)

  function handleMovieDescriptionSubmit(description) {
    setMessages((prev) => {
      const newUserPrompt = {
        from: "user",
        key : Date.now(),
        value: description,
      };

      const loadingGPTResponse = {
        from: "GPT",
        inputValue: description,
        key : Date.now(),
        value: "",
      };
      return [...prev, newUserPrompt, loadingGPTResponse];
    });
    setTypedDescription("");
  }

  function handleDiscover(description){
    setMessages((prev) => {
        const newUserPrompt = {
          from: "user",
          value: description,
        };
  
        const loadingGPTResponse = {
          from: "GPT",
          inputValue: description,
          value: "",
        };
        return [...prev, newUserPrompt, loadingGPTResponse];
      });
      setTypedDescription("");
  }
  return (
    <div className="chat-input">
      <div className="chat-input-inner">
        <button
        onClick={()=>{
            setDisableInput(true)
            handleDiscover(randomMovieDescription[randomIndex])
        }}
        className="discover">
          Discover
          <img src={discoverIcon} alt="discover icon" />
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMovieDescriptionSubmit(typedDescription)
          }}
          className="home-input search-input"
        >
          <input
            onChange={(e) => {
              setTypedDescription(e.target.value)
            }}
            value={typedDescription}
            placeholder="A movie about..."
            disabled={disableInput}
            ref={inputRef}
            required
            type="text"
          />
          <button>
            <img src={sendIcon} alt="search for your movie" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
