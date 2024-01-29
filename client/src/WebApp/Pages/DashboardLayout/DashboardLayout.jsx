import "./DashboardLayout.css"
import Header from "../../components/Header/Header"
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage"
import ChatInput from "../../components/ChatInput/ChatInput"
import Sidebar from "../../components/Sidebar/Sidebar"
import UserPrompt from "../../components/UserPrompt/UserPrompt"
import GPTResponse from "../../components/GPTResponse/GPTResponse"
import { Link } from "react-router-dom"

function DashboardLayout({children}) {
  return (
    <main className="layout-main">
        <Sidebar />

        <section className="chat">
            {children}
        </section>
    </main>
  )
}

export default DashboardLayout