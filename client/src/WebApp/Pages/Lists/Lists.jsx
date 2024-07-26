import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import deleteIcon from "../../../assets/app assets/icons/delete-icon.svg"
import {Link, useNavigate, useParams} from "react-router-dom"
import "./Lists.css"
import SingleListMovie from "../../components/SingleListMovie/SingleListMovie"
import { useEffect, useState } from "react"
import SingleListMovieSkeleton from "../../components/SkeletonLoaders/SingleListMovieSkeleton/SingleListMovieSkeleton"
import menuIcon from "../../../assets/app assets/icons/menu-icon.svg"
import SingleListMovieError from "../../components/SingleListMovieError/SingleListMovieError"
import { Toaster } from "react-hot-toast"
import { useAtom } from "jotai"
import { activeListIdAtom, allMoviesListIdAtom, listIdToDeleteAtom, openSidebarAtom, refreshListAtom } from "../../globals/atom"



function Lists() {
  const [listFetchStatus, setListFetchStatus] = useState("loading")
  const [listInfo, setListInfo] = useState({})
  const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
  const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)
  const [allMoviesListId, setAllMoviesListId] = useAtom(allMoviesListIdAtom)
  const [refreshList, setRefreshList] = useAtom(refreshListAtom)
  const [openSidebar, setOpenSidebar] = useAtom(openSidebarAtom)

  const {movieListId} = useParams()
  const navigate = useNavigate()


  useEffect(()=>{
    getInformationAboutList()
    setActiveListId(movieListId)
  }, [movieListId])

  async function getInformationAboutList(){
    setListFetchStatus("loading")
    try{
      const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/list/movies/${movieListId}`, {
            credentials: "include"
        })
        const fetchInJson = await rawFetch.json()

        if(!rawFetch.ok){
            throw new Error("Err", {cause : fetchInJson})
        }
        setListInfo(fetchInJson)
        console.log(fetchInJson)
        setListFetchStatus("completed")
    }
    catch(err){
      setListFetchStatus("error")
    }
  }

  async function deleteList(id){
    try{
    const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/list/movies/${movieListId}/l`,{
      method : "DELETE",
      credentials : "include"
    })
    const fetchInJson = await rawFetch.json()

    if(!rawFetch.ok){
      throw new Error("err", {cause : fetchInJson})
    }
    const filteredMoviesListIds = allMoviesListId.filter((id)=> id !== movieListId)
            if(filteredMoviesListIds.length == 0){
                navigate("/app")
                setRefreshList((prev)=> prev + 1)
            }else{
                navigate(`/app/list/movie/${filteredMoviesListIds[0]}`)
                setRefreshList((prev)=> prev+1)
            }

    }
    catch(err){
      alert("an error ocurred when you tried to delete that list, please try again")
      
    }
  }

  function openSidebarFn(){
    setOpenSidebar(true)
  }

  const mappedMoviesFromList = listInfo?.moviesInList?.map(({movieName, moviePoster, movieReleaseDate, movieId})=>{
    return <SingleListMovie 
    getInformationAboutListFunction={getInformationAboutList}
    movieName={movieName}
    listId={movieListId}
    deleteList={deleteList}
    listInfo={listInfo}
    movieId={movieId}
    listName={listInfo.listName}
    key={movieId} 
    moviePoster={moviePoster} 
    movieReleaseDate={movieReleaseDate} />  
  })
  return (
    <div className="list-layout">
      {listFetchStatus == "loading" && <SingleListMovieSkeleton />}
      {listFetchStatus == "error" && (
        <SingleListMovieError content={"movies"} refreshFromError={getInformationAboutList} />
      )}
      {listFetchStatus == "completed" && (
        <>
          <div className="list-header">
            <div className="left-buttons">
              <button onClick={openSidebarFn} className="back-button-container">
                <img src={menuIcon} alt="show menu" />
              </button>

              <button className="back-button-container">
                <Link to="/app">
                  <img src={backIcon} alt="go back" />
                </Link>
              </button>
            </div>

            <h1 className="tight-heading-style">
              {listInfo?.listName}({listInfo?.moviesInList?.length})
            </h1>

            <button
              onClick={() => {
                deleteList(movieListId);
              }}
              className="back-button-container"
            >
              <img src={deleteIcon} alt="trashcan icon" />
            </button>
          </div>
          <div className="list-movie-container">{mappedMoviesFromList}</div>
        </>
      )}

      <Toaster toastOptions={{ duration: 4000 }} />
    </div>
  );
}

export default Lists