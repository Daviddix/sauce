import discoverIcon from "../../../assets/app assets/icons/discover-icon.svg"
import sendIcon from "../../../assets/app assets/icons/airplane-icon.svg"

import "./ChatInput.css"


function ChatInput() {
  return (
    <div className="chat-input">
                <div className="chat-input-inner">
                <button className="discover">
                    Discover 
                    <img src={discoverIcon} alt="discover icon" />
                </button>

                <div className="home-input search-input">
                    <input 
                    placeholder="A movie about..."
                    type="text" />
                    <button>
                        <img src={sendIcon} alt="search for your movie" />
                    </button>
                </div>
                </div>
                
            </div>
  )
}

export default ChatInput