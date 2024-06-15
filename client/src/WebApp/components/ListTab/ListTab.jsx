import "./ListTab.css"

function ListTab() {
  return (
    <div className="list-tab-container">
    <button className="active">Movies</button>
    <button>TV Shows</button>
    <button>Anime</button>
  </div>
  )
}

export default ListTab