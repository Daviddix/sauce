import discoverIcon from "../../../assets/app assets/icons/discover-icon.svg";
import sendIcon from "../../../assets/app assets/icons/airplane-icon.svg";
import downIcon from "../../../assets/app assets/icons/down-icon.svg";
import { set } from 'idb-keyval'

import "./ChatInput.css";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { disableInputAtom, inputValueFromEditAtom, messagesAtom } from "../../globals/atom";
import { generateUniqueId, randomMovieDescription } from "../../globals/others";

function ChatInput() {
  const [typedDescription, setTypedDescription] = useState("")
  const [disableInput, setDisableInput] = useAtom(disableInputAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [inputValueFromEdit, setInputValueFromEdit] = useAtom(inputValueFromEditAtom)
  const [h, setH] = useState(48)
  
  const randomIndex = Math.ceil(Math.random() * randomMovieDescription.length - 1)

  useEffect(()=>{
    if(inputValueFromEdit !== ""){
      setTypedDescription(inputValueFromEdit)
      inputRef.current.focus()
    }
  }, [inputValueFromEdit])

  const inputRef = useRef(null)

  function handleMovieDescriptionSubmit(description) {
    if(description.trim() == "") return
    setMessages((prev) => {
      const newUserPrompt = {
        from: "user",
        key : Date.now(),
        id : generateUniqueId(),
        value: description,
      };

      const loadingGPTResponse = {
        from: "GPT",
        inputValue: description,
        id : generateUniqueId(),
        key : Date.now(),
        value: "",
      };
      set('mess', [...prev, newUserPrompt, loadingGPTResponse])
      return [...prev, newUserPrompt, loadingGPTResponse];
    });
    setTypedDescription("");
  }

  function handleDiscover(description){
    setMessages((prev) => {
        const newUserPrompt = {
          from: "user",
          key : Date.now(),
          id : generateUniqueId(),
          value: description,
        };
  
        const loadingGPTResponse = {
          from: "GPT",
          key : newUserPrompt.key,
          id : generateUniqueId(),
          inputValue: description,
          value: "",
        };
        set('mess', [...prev, newUserPrompt, loadingGPTResponse])
        return [...prev, newUserPrompt, loadingGPTResponse];
      });
      setTypedDescription("");
  }
  
  function handleInputHeightChange(e){
    console.log(e.target.scrollHeight)
    if(e.target.scrollHeight >= 100){
      return
    }else if(e.target.scrollHeight <= 45){
      return
    }
    else {
      setH(e.target.scrollHeight)
    }
  }

  useEffect(()=>{
    if (typedDescription == "") {
      setH(48)
    }
  }, [typedDescription])
  return (
    <div className="chat-input">
      <div className="chat-input-inner">
        <div className="top-buttons">
        <button
        onClick={()=>{
            setDisableInput(true)
            handleDiscover(randomMovieDescription[randomIndex])
        }}
        className="discover">
          Discover
          <img src={discoverIcon} alt="discover icon" />
        </button>

        <div className="category-selector-container">
          <div className="all-categories-container">
            <h1 className="sub-sub-heading">Find</h1>

            <hr />

            <div className="categories">
              <button className="active">Movies</button>
              <button>TV Shows</button>
              <button>Anime</button>
            </div>
          </div>

          <button className="categories-button">Anime <img src={downIcon} alt="" /></button>
        </div>

        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMovieDescriptionSubmit(typedDescription)
          }}
          className="home-input search-input"
          style={{
            height : `${h}px`
          }}
        >
          <textarea
          style={{
            height : `${h}px`
          }}
          row="1"
            onChange={(e) => {
              setTypedDescription(e.target.value)
              handleInputHeightChange(e)
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
