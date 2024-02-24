import React from 'react'
import Header from '../../components/Header/Header'
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage'
import UserPrompt from '../../components/UserPrompt/UserPrompt'
import GPTResponse from '../../components/GPTResponse/GPTResponse'
import ChatInput from '../../components/ChatInput/ChatInput'
import {useState, useEffect, useRef} from "react"
import { useAtom } from 'jotai'
import { messagesAtom } from '../../globals/atom'
import GoToBottomButton from '../../components/GoToBottomButton/GoToBottomButton'

function Home() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(()=> JSON.parse(localStorage.getItem("first-time-user")))
  const chatSectionRef = useRef()

  const [messages, setMessages] = useAtom(messagesAtom)

  useEffect(()=>{
      localStorage.setItem("first-time-user", JSON.stringify(false))
  }, [isFirstTimeUser])

  const mappedMessages = messages.map(({from, value, inputValue, key, id})=>{
    return (
      from === "user" ? 
      <UserPrompt key={id} id={key} prompt={value} /> 
      : 
      <GPTResponse key={id} id={key} inputValue={inputValue} />
    )
  })

  return (
    <section className="chat">
     <Header /> 

    <section 
    ref={chatSectionRef}
    className="chat-body">
        
        <div className="chat-body-inner">
          {
            isFirstTimeUser == null && <WelcomeMessage />}

        {mappedMessages}
        
        <GoToBottomButton refToScroll={chatSectionRef.current} />
        </div>
        
    </section>



    <ChatInput  />
    </section>
  )
}

export default Home