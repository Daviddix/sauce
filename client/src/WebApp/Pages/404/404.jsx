import { Link } from "react-router-dom"
import "./404.css"

function NotFound() {
  return (
    <section className="not-found-layout">
        <h1 className="subheading">You seem lost</h1>

        <Link to={"/app"}>
        <button className="secondary-button button-text-style">Go Home</button>
        </Link>
      </section>
  )
}

export default NotFound