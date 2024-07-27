import Header from '../../components/Header/Header'
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage'
import UserPrompt from '../../components/UserPrompt/UserPrompt'
import GPTResponse from '../../components/GPTResponse/GPTResponse'
import ChatInput from '../../components/ChatInput/ChatInput'
import {useState, useEffect, useRef} from "react"
import { useAtom } from 'jotai'
import { activeListIdAtom, messagesAtom, showLogoutModalAtom } from '../../globals/atom'
import GoToBottomButton from '../../components/GoToBottomButton/GoToBottomButton'
import { get } from 'idb-keyval'
import LogoutModal from "../../components/LogoutModal/LogoutModal"
import GPTResponseAnime from '../../components/GPTResponseAnime/GPTResponseAnime'
import GPTResponseTvShows from '../../components/GPTResponseTVShows/GPTResponseTVShows'


function Home() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(()=> JSON.parse(localStorage.getItem("first-time-user")))
  const chatSectionRef = useRef()

  const [messages, setMessages] = useAtom(messagesAtom)
  const [showDownButton, setShowDownButton] = useState(false)
  const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
  const [showLogoutModal, setShowLogoutModal] = useAtom(showLogoutModalAtom)

  useEffect(()=>{
    getMessagesFromIndexedDb()
      localStorage.setItem("first-time-user", JSON.stringify(false))
      setActiveListId(0)
  }, [isFirstTimeUser])

  const mappedMessages = messages.map(({from, value, inputValue, key, id, searchCategory})=>{
    return (
      from === "user" ? 
      <UserPrompt key={id} id={key} prompt={value} searchCategory={searchCategory} />  
      : 
      searchCategory == "Movies"?
        <GPTResponse key={id} id={key} inputValue={inputValue} searchCategory={searchCategory} />
        :
          searchCategory == "Anime"?
            <GPTResponseAnime key={id} id={key} inputValue={inputValue} searchCategory={searchCategory} />
            :
            searchCategory == "TV Shows"?
            <GPTResponseTvShows key={id} id={key} inputValue={inputValue} searchCategory={searchCategory} />
              : null
    )
  })

  function userHasScrolledToEndOfChat(e){
    const tolerance = 1
    const isAtBottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + tolerance
    setShowDownButton(!isAtBottom)
  }

  async function getMessagesFromIndexedDb(){
    const messagesFromIndexedDb = await get("mess")
    if(typeof messagesFromIndexedDb == "object" && messagesFromIndexedDb.length > 0){
      setMessages(messagesFromIndexedDb)
    }else{
      return 
    }
  }

  return (
    <>
     <Header />

    <section 
    ref={chatSectionRef}
    onScroll={userHasScrolledToEndOfChat}
    className="chat-body"> 
        
        <div className="chat-body-inner">
          {isFirstTimeUser == null && <WelcomeMessage />}

        {mappedMessages}

        {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
        
        {showDownButton && <GoToBottomButton refToScroll={chatSectionRef} setShowDownButton={setShowDownButton} />}
        </div>
        
    </section>

    <ChatInput  />
    </>
  )
}

export default Home