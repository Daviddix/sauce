function SingleListTvShow({listName, listCoverImage,tvShowsInList, activeListId, setActiveListId, id}) {
    return ( 
      <div
      onClick={()=>{
        setActiveListId(id)
      }}
      tabIndex={0} 
      className={activeListId == id? "single-list active" : "single-list"}>
                <img src={`https://image.tmdb.org/t/p/w1280/${listCoverImage}`} alt="list background image" className="bg" />
  
              <div className="list-inner">
                <div className="list-name-number">
                  <h2 className="sub-sub-heading">{listName}</h2>
                  <p className="sub-body-style">{tvShowsInList.length} Tv Show
                  {tvShowsInList.length > 1?
                   "s" : 
                   ""}</p>
                </div>
              </div>
      </div>
    )
  }
  
  export default SingleListTvShow