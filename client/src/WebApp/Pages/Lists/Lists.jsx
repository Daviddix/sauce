import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import deleteIcon from "../../../assets/app assets/icons/delete-icon.svg"
import {Link, useParams} from "react-router-dom"
import "./Lists.css"
import SingleListMovie from "../../components/SingleListMovie/SingleListMovie"
import { useEffect, useState } from "react"
import SingleListMovieSkeleton from "../../components/SkeletonLoaders/SingleListMovieSkeleton/SingleListMovieSkeleton"
import SingleListMovieError from "../../components/SingleListMovieError/SingleListMovieError"
import { Toaster } from "react-hot-toast"
import { useAtom } from "jotai"
import { activeListIdAtom, listIdToDeleteAtom } from "../../globals/atom"



function Lists() {
  const [listFetchStatus, setListFetchStatus] = useState("loading")
  const [listInfo, setListInfo] = useState({})
  const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
  const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)

  const {listId} = useParams()


  useEffect(()=>{
    getInformationAboutList()
    setActiveListId(listId)
  }, [listId])

  async function getInformationAboutList(){
    setListFetchStatus("loading")
    try{
      const rawFetch = await fetch(`http://localhost:3000/app/list/${listId}`, {
            credentials: "include"
        })
        const fetchInJson = await rawFetch.json()

        if(!rawFetch.ok){
            throw new Error("Err", {cause : fetchInJson})
        }
        setListInfo(fetchInJson)
        setListFetchStatus("completed")
    }
    catch(err){
      setListFetchStatus("error")
    }
  }

  async function deleteList(){
    try{
    const rawFetch = await fetch(`http://localhost:3000/app/list/${listId}/l`,{
      method : "DELETE",
      credentials : "include"
    })
    const fetchInJson = await rawFetch.json()

    if(!rawFetch.ok){
      throw new Error("err", {cause : fetchInJson})
    }
    setListIdToDelete(listId)
    }
    catch(err){
      alert("an error ocurred when you tried to delete that list, please try again")
    }
  }

  const mappedMoviesFromList = listInfo?.moviesInList?.map(({movieName, moviePoster, movieReleaseDate, movieId})=>{
    return <SingleListMovie 
    getInformationAboutListFunction={getInformationAboutList}
    movieName={movieName}
    listId={listId}
    movieId={movieId}
    listName={listInfo.listName}
    key={movieId} 
    moviePoster={moviePoster} 
    movieReleaseDate={movieReleaseDate} />  
  })
  return (
    <div className='list-layout'>
      {
        listFetchStatus == "loading" && <SingleListMovieSkeleton />
      }
      {
        listFetchStatus == "error" &&  <SingleListMovieError refreshFromError={getInformationAboutList} />
      }
      { listFetchStatus == "completed" &&
        <>
        <div className="list-header">
        <button className="back-button-container">
        <Link to="/app">
        <img src={backIcon} alt="go back" />
        </Link>
      </button>

      <h1 className="tight-heading-style">{listInfo?.listName}({listInfo?.moviesInList?.length})</h1>

      <button 
      
      className="back-button-container">
        <img 
        onClick={()=>{
          deleteList()
        }}
        src={deleteIcon} alt="trashcan icon" />
      </button>
        </div>
        <div className="list-movie-container">
        {mappedMoviesFromList}                      
        </div>
        </>
      }

<Toaster toastOptions={{duration : 4000}} />
        
    </div>
  )
}

export default Lists