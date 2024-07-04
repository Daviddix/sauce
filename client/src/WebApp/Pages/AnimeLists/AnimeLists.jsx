import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import deleteIcon from "../../../assets/app assets/icons/delete-icon.svg"
import {Link, useNavigate, useParams} from "react-router-dom"

import { useEffect, useState } from "react"
import SingleListMovieSkeleton from "../../components/SkeletonLoaders/SingleListMovieSkeleton/SingleListMovieSkeleton"
import SingleListMovieError from "../../components/SingleListMovieError/SingleListMovieError"
import { Toaster } from "react-hot-toast"
import { useAtom } from "jotai"
import { activeListIdAtom, allAnimeListIdAtom, listIdToDeleteAtom, refreshListAtom } from "../../globals/atom"
import SingleListAnimep from "../../components/SingleListAnimep/SingleListAnimep"

function AnimeLists(){
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [listInfo, setListInfo] = useState({})
    const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
    const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)
    const [allAnimeListId, setAllAnimeListId] = useAtom(allAnimeListIdAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)

    const {animeListId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getInformationAboutList()
        setActiveListId(animeListId)
    }, [animeListId])

    async function getInformationAboutList(){
        setListFetchStatus("loading")
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/list/anime/${animeListId}`, {
                credentials: "include"
            })
            const fetchInJson = await rawFetch.json()

            if(rawFetch.ok){
                setListInfo(fetchInJson)
                setListFetchStatus("completed")
            }
        }
        catch(err){
            setListFetchStatus("error")
        }
    }

    async function deleteList(id){
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/list/anime/${animeListId}/l`,{
                method : "DELETE",
                credentials : "include"
              }) 
            const fetchInJson = await rawFetch.json()
    
            if(!rawFetch.ok){
                throw new Error("err", {cause : fetchInJson})
            }
            // setListIdToDelete(id)
            const filteredAnimeListIds = allAnimeListId.filter((id)=> id !== animeListId)
            if(filteredAnimeListIds.length == 0){
                navigate("/app")
            }else{
                navigate(`/app/list/anime/${filteredAnimeListIds[0]}`)
                setRefreshList(3)
            }

        }catch(err){
            alert("an error ocurred when you tried to delete that list, please try again")
            console.log(err)
        }
    }

    const mappedAnimeFromList = listInfo.animeInList?.map(({animeName, animePoster, animeReleaseDate, animeId})=>{
        return <SingleListAnimep 
        getInformationAboutListFunction={getInformationAboutList}
        animeName={animeName}
        listId={animeListId}
        deleteList={deleteList}
        listInfo={listInfo}
        animeId={animeId}
        listName={listInfo.listName}
        key={animeId}
        animePoster={animePoster}
        animeReleaseDate={animeReleaseDate}
        />
    })
    return <div className='list-layout'>
        {
        listFetchStatus == "loading" && <SingleListMovieSkeleton />
      }
      {
        listFetchStatus == "error" &&  <SingleListMovieError refreshFromError={getInformationAboutList} />
      }
      {
        listFetchStatus == "completed" && 
        <>
        <div className="list-header">
        <button className="back-button-container">
        <Link to="/app">
        <img src={backIcon} alt="go back" />
        </Link>
      </button>

      <h1 className="tight-heading-style">{listInfo?.listName}({listInfo?.animeInList?.length})</h1>

      <button 
      onClick={()=>{
        deleteList(animeListId)
      }}
      className="back-button-container">
        <img 
        src={deleteIcon} alt="trashcan icon" />
      </button>
        </div>

        <div className="list-movie-container">
        {mappedAnimeFromList}                      
        </div>
        </>
      }

<Toaster toastOptions={{duration : 4000}} />


    </div>
}

export default AnimeLists
