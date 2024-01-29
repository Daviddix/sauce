import React from 'react'
import Header from '../../components/Header/Header'
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage'
import UserPrompt from '../../components/UserPrompt/UserPrompt'
import GPTResponse from '../../components/GPTResponse/GPTResponse'
import ChatInput from '../../components/ChatInput/ChatInput'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="chat">
     <Header />        

    <section className="chat-body">
        
        <div className="chat-body-inner">
          {/* <WelcomeMessage /> */}
        <UserPrompt />
          
        <GPTResponse />
        
        </div>
        
    </section>


    <ChatInput />
    </section>
  )
}

export default Home