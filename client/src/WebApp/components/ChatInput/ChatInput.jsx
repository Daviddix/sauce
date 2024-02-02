import discoverIcon from "../../../assets/app assets/icons/discover-icon.svg";
import sendIcon from "../../../assets/app assets/icons/airplane-icon.svg";

import "./ChatInput.css";

import { useState } from "react";
import { useAtom } from "jotai";
import { disableInputAtom } from "../../atoms/atom";

function ChatInput({ setMessages }) {
  const [typedDescription, setTypedDescription] = useState("")
  const [disableInput, setDisableInput] = useAtom(disableInputAtom)
  const randomMovieDescription = [
    "A skilled thief enters the dreams of others to steal their deepest secrets.",
    "A banker is sentenced to life in Shawshank State Penitentiary for a crime he didn't commit.",
    "Batman faces the chaotic Joker as he tries to bring justice to Gotham City.",
    "The life story of a man with a low IQ who inadvertently influences several defining moments in history.",
    "The intersecting lives of various criminals in the Los Angeles underworld.",
    "A love story set against the backdrop of the ill-fated maiden voyage of the R.M.S. Titanic.",
    "A computer hacker discovers the truth about reality and joins a group of rebels against sentient machines.",
    "A theme park with genetically engineered dinosaurs becomes a terrifying adventure for its visitors.",
    "The patriarch of a powerful crime family passes control to his reluctant son.",
    "A young farm boy joins a rebellion against an evil empire in a galaxy far, far away.",
  ]
  const randomIndex = Math.ceil(Math.random() * randomMovieDescription.length)

  function handleMovieDescriptionSubmit(description) {
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
