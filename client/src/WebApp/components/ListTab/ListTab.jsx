import "./ListTab.css"

function ListTab({listCategoryToShow, setListCategoryToShow}) {
  function changeListCategoriesToMovies(){
      setListCategoryToShow("Movies")
  }

  function changeListCategoriesToTvShows(){
    setListCategoryToShow("TV Shows")
  }

  function changeListCategoriesToAnime(){
    setListCategoryToShow("Anime")
  }
  return (
    <div className="list-tab-container">
    <button 
    onClick={changeListCategoriesToMovies}
    className={listCategoryToShow == "Movies"? "active" : ""}>Movies</button>

    <button 
    onClick={changeListCategoriesToTvShows}
    className={listCategoryToShow == "TV Shows"? "active" : ""}>TV Shows</button>

    <button 
    onClick={changeListCategoriesToAnime}
    className={listCategoryToShow == "Anime"? "active" : ""}>Anime</button>
  </div>
  )
}

export default ListTab