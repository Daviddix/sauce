import discoverIcon from "../../../assets/app assets/icons/discover-icon.svg";
import sendIcon from "../../../assets/app assets/icons/airplane-icon.svg";
import { set } from 'idb-keyval'

import "./ChatInput.css";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { disableInputAtom, inputValueFromEditAtom, messagesAtom, searchCategoryAtom } from "../../globals/atom";
import { generateUniqueId, randomMovieDescription, randomAnimeDescription, randomTvShowDescription } from "../../globals/others";
import Categories from "../Categories/Categories";

function ChatInput() {
  const [typedDescription, setTypedDescription] = useState("")
  const [disableInput, setDisableInput] = useAtom(disableInputAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [inputValueFromEdit, setInputValueFromEdit] = useAtom(inputValueFromEditAtom)
  const [h, setH] = useState(48)
  const [searchCategory, setSearchCategory] = useAtom(searchCategoryAtom)
  
  const randomIndex = Math.ceil(Math.random() * randomMovieDescription.length - 1)

  useEffect(()=>{
    if(inputValueFromEdit !== ""){
      setTypedDescription(inputValueFromEdit)
      inputRef.current.focus()
    }
  }, [inputValueFromEdit])

  const inputRef = useRef(null)

  function handleMovieDescriptionSubmit(description, category) {
    if(description.trim() == "") return
    setMessages((prev) => {
      const newUserPrompt = {
        from: "user",
        key : Date.now(),
        id : generateUniqueId(),
        value: description,
        searchCategory: category
      };

      const loadingGPTResponse = {
        from: "GPT",
        inputValue: description,
        id : generateUniqueId(),
        key : Date.now(),
        value: "",
        searchCategory: category
      };
      set('mess', [...prev, newUserPrompt, loadingGPTResponse])
      return [...prev, newUserPrompt, loadingGPTResponse];
    });
    setTypedDescription("");
  }

  function handleDiscover(description, category){
    setMessages((prev) => {
        const newUserPrompt = {
          from: "user",
          key : Date.now(),
          id : generateUniqueId(),
          value: description,
          searchCategory: category
        };
  
        const loadingGPTResponse = {
          from: "GPT",
          key : newUserPrompt.key,
          id : generateUniqueId(),
          inputValue: description,
          value: "",
          searchCategory: category
        };
        set('mess', [...prev, newUserPrompt, loadingGPTResponse])
        return [...prev, newUserPrompt, loadingGPTResponse];
      });
      setTypedDescription("");
  } 
  
  function handleInputHeightChange(e){
    
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
            if(searchCategory == "Anime"){
              return handleDiscover(randomAnimeDescription[randomIndex], searchCategory)
            }else if(searchCategory == "TV Shows"){
              return handleDiscover(randomTvShowDescription[randomIndex], searchCategory)
            }else if(searchCategory == "Movies"){
              return handleDiscover(randomMovieDescription[randomIndex], searchCategory)
            }else{
              alert("check your category setter")
              setDisableInput(false)
            }
                    }}
        className="discover">
          Discover
          <img src={discoverIcon} alt="discover icon" />
        </button>

        <Categories />

        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMovieDescriptionSubmit(typedDescription, searchCategory)
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
            placeholder={searchCategory == "Movies" ? `A movie about...` : searchCategory == "TV Shows" ? `A tv show about...` : `An anime about...`}
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
