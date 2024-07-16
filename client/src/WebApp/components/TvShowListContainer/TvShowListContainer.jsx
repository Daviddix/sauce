import { useEffect, useState } from "react"
import SidebarListError from "../SidebarListError/SidebarListError"
import { useAtom } from "jotai"
import { activeListIdAtom, allTvShowsListIdAtom, isSignedInAtom, listIdToDeleteAtom, refreshListAtom } from "../../globals/atom"
import { useNavigate } from "react-router-dom"
import SingleSidebarListTvShows from "../SingleSidebarListTvShows/SingleSidebarListTvShows"

function TvShowListContainer() {
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [lists, setLists] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
    const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)
    const [allListIds, setAllListIds] = useState([])
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const [allTvShowsListId, setAllTvShowsListId] = useAtom(allTvShowsListIdAtom)
    const navigate = useNavigate()

    async function getListsByUser(){
        setListFetchStatus("loading")
        try{
        const rawFetch = await fetch("https://sauce-dev.onrender.com/app/list/tv", {
            credentials: "include"
        })
        const fetchInJson = await rawFetch.json()

        if(!rawFetch.ok){
            throw new Error("Err", {cause : fetchInJson})
        }
        setLists(fetchInJson)
        const ids = fetchInJson.map((list)=> {return list._id})
        setAllTvShowsListId(ids)
        setListFetchStatus("completed")
        }
        catch(err){
          if(err.cause.reason == "missing token"){
            setListFetchStatus("completed")
          }else{
            setListFetchStatus("error")
          }
        }
        
    }

    async function getListsByUserWithoutLoading(){
      try{
      const rawFetch = await fetch("https://sauce-dev.onrender.com/app/list/tv", {
          credentials: "include"
      })
      const fetchInJson = await rawFetch.json()

      if(!rawFetch.ok){
          throw new Error("Err", {cause : fetchInJson})
      }
      setLists(fetchInJson)
      const ids = fetchInJson.map((list)=> {return list._id})
      setAllTvShowsListId(ids)
      setListFetchStatus("completed")
      }
      catch(err){
          setListFetchStatus("error")
          
          
      }
      
  }

    const mappedLists = lists.map(({listName, listCoverImage, tvShowsInList, _id})=>{
        return <SingleSidebarListTvShows
        setActiveListId={setActiveListId}
        activeListId={activeListId}
        key={_id}
        id={_id}
        listName={listName} 
        listCoverImage={listCoverImage}
        tvShowsInList={tvShowsInList} 
        />
    })

    const mappedFilteredList = filteredList.map(({listName, listCoverImage, tvShowsInList, _id})=>{
        return <SingleSidebarListTvShows 
        setActiveListId={setActiveListId}
        activeListId={activeListId}
        key={_id}
        id={_id}
        listName={listName} 
        listCoverImage={listCoverImage}
        tvShowsInList={tvShowsInList} 
        />
    })

    useEffect(()=>{
      if(!isSignedIn){
        setListFetchStatus("completed")
        setLists([])
        return
      }  
        getListsByUser()
    }, [isSignedIn])

    useEffect(()=>{
      if(refreshList == 0){
        return
      }else{
        getListsByUserWithoutLoading()
      }
  }, [refreshList])

    // useEffect(() => {
    //   if (listIdToDelete == 0) return
    //   else {
    //     const n = lists.filter((list) => list._id !== listIdToDelete)
    //     if (n.length == 0) {
    //       navigate("/app")
    //       setFilteredList(n);
    //       setLists(n)
    //       getListsByUserWithoutLoading()
    //       return
    //     }
    //     setFilteredList(n);
    //     setLists(n)
    //     const onlyIds = n.map((list) => list._id)
    //     setAllListIds(onlyIds);
    //     if (listIdToDelete == onlyIds[0]) {
    //       navigate(`/app/list/${onlyIds[1]}`)
    //     } else {
    //       navigate(`/app/list/${onlyIds[0]}`)
    //     }
    //   }
    // }, [listIdToDelete])

  return (
    <div className="lists-container">
        {
            listFetchStatus == "loading" && <div className="login-loader"></div>
        } 
        {
            listFetchStatus == "completed" && filteredList.length == 0? mappedLists : mappedFilteredList
        }
        {
            listFetchStatus == "error" && <SidebarListError refreshFromError={getListsByUser} />
        }
    </div>
  )
}

export default TvShowListContainer