import "./DashboardLayout.css"
import Header from "../../components/Header/Header"
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage"
import ChatInput from "../../components/ChatInput/ChatInput"
import Sidebar from "../../components/Sidebar/Sidebar"

function DashboardLayout() {
  return (
    <main className="layout-main">
        <Sidebar />

        <section className="chat">
            <Header />            

            <section className="chat-body">
                
                <div className="chat-body-inner">
                <WelcomeMessage />
                </div>
                
            </section>

            <ChatInput />
        </section>
    </main>
  )
}

export default DashboardLayout