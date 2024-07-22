import "./DashboardLayout.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect } from "react"

function DashboardLayout({children}) {
  useEffect(()=>{
    document.title = "Sauce | Find Movies, TV Shows & Anime You've Forgotten Using AI"
  }, [])
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