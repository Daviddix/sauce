import backIcon from "../../../assets/app assets/icons/left-icon.svg"
import deleteIcon from "../../../assets/app assets/icons/delete-icon.svg"
import {Link, useNavigate, useParams} from "react-router-dom"

import { useEffect, useState } from "react"
import SingleListMovieSkeleton from "../../components/SkeletonLoaders/SingleListMovieSkeleton/SingleListMovieSkeleton"
import SingleListMovieError from "../../components/SingleListMovieError/SingleListMovieError"
import { Toaster } from "react-hot-toast"
import { useAtom } from "jotai"
import { activeListIdAtom, allTvShowsListIdAtom, listIdToDeleteAtom, refreshListAtom } from "../../globals/atom"
import SingleListTvShowp from "../../components/SingleListTvShowp/SingleListTvShowp"

function TvShowLists(){
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [listInfo, setListInfo] = useState({})
    const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
    const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)
    const [allTvShowsListId, setAllTvShowsListId] = useAtom(allTvShowsListIdAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)

    const {tvShowListId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getInformationAboutList()
        setActiveListId(tvShowListId)
    }, [tvShowListId])

    async function getInformationAboutList(){
        setListFetchStatus("loading")
        try{
            const rawFetch = await fetch(`http://localhost:3000/app/list/tv/${tvShowListId}`, {
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
            const rawFetch = await fetch(`http://localhost:3000/app/list/tv/${tvShowListId}/l`,{
                method : "DELETE",
                credentials : "include"
              }) 
            const fetchInJson = await rawFetch.json()
    
            if(!rawFetch.ok){
                throw new Error("err", {cause : fetchInJson})
            }
            const filteredTvShowList = allTvShowsListId.filter((id)=> id !== tvShowListId)
            console.log(filteredTvShowList)
            if(filteredTvShowList.length == 0){
                navigate("/app")
                setRefreshList((prev)=> prev + 1)
            }else{
                navigate(`/app/list/tv/${filteredTvShowList[0]}`)
                setRefreshList((prev)=> prev + 1)
            }

        }catch(err){
            alert("an error ocurred when you tried to delete that list, please try again")
            console.log(err)
        }
    }

    const mappedTvShowsFromList = listInfo.tvShowsInList?.map(({tvShowName, tvShowPoster, tvShowReleaseDate, tvShowId})=>{
        return <SingleListTvShowp 
        getInformationAboutListFunction={getInformationAboutList}
        tvShowName={tvShowName}
        listId={tvShowListId}
        deleteList={deleteList}
        listInfo={listInfo}
        tvShowId={tvShowId}
        listName={listInfo.listName}
        key={tvShowId}
        tvShowPoster={tvShowPoster}
        tvShowReleaseDate={tvShowReleaseDate}
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

      <h1 className="tight-heading-style">{listInfo?.listName}({listInfo?.tvShowsInList?.length})</h1>

      <button 
      onClick={()=>{
        deleteList(tvShowListId)
      }}
      className="back-button-container">
        <img 
        src={deleteIcon} alt="trashcan icon" />
      </button>
        </div>

        <div className="list-movie-container">
        {mappedTvShowsFromList}                      
        </div>
        </>
      }

<Toaster toastOptions={{duration : 4000}} />


    </div>
}

export default TvShowLists
