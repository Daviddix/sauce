import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import deleteIcon from "../../../assets/app assets/icons/delete-icon.svg"
import {Link, useParams} from "react-router-dom"
import "./Lists.css"
import SingleListMovie from "../../components/SingleListMovie/SingleListMovie"
import { useEffect, useState } from "react"


function Lists() {
  const [listFetchStatus, setListFetchStatus] = useState("loading")
  const [listInfo, setListInfo] = useState({})

  const {listId} = useParams()


  useEffect(()=>{
    getInformationAboutList()
  }, [listId])

  async function getInformationAboutList(){
    try{
      const rawFetch = await fetch(`http://localhost:3000/app/list/${listId}`, {
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
      console.log(err)
    }
  }

  const mappedMoviesFromList = listInfo.moviesInList?.map(({movieName, moviePoster, movieReleaseDate})=>{
    return <SingleListMovie movieName={movieName} moviePoster={moviePoster} movieReleaseDate={movieReleaseDate} />  
  })
  return (
    <div className='list-layout'>
        <div className="list-header">
        <button className="back-button-container">
        <Link to="/app">
        <img src={backIcon} alt="go back" />
        </Link>
      </button>

      <h1 className="tight-heading-style">{listInfo.listName}({listInfo?.moviesInList?.length})</h1>

      <button className="back-button-container">
        <img src={deleteIcon} alt="go back" />
      </button>
        </div>
        <div className="list-movie-container">
      {mappedMoviesFromList}                      
        </div>
    </div>
  )
}

export default Lists