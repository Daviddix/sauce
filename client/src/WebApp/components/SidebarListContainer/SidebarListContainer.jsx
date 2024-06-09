import { useEffect, useState } from "react"
import "./SidebarListContainer.css"
import SingleSidebarList from "../SingleSidebarList/SingleSidebarList"
import SidebarListError from "../SidebarListError/SidebarListError"
import { useAtom } from "jotai"
import { activeListIdAtom, isSignedInAtom, listIdToDeleteAtom, refreshListAtom } from "../../globals/atom"
import { useNavigate } from "react-router-dom"

function SidebarListContainer() {
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [lists, setLists] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
    const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)
    const [allListIds, setAllListIds] = useState([])
    const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)
    const navigate = useNavigate()

    async function getListsByUser(){
        setListFetchStatus("loading")
        console.log("here")
        try{
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/list", {
            credentials: "include"
        })
        const fetchInJson = await rawFetch.json()

        if(!rawFetch.ok){
            throw new Error("Err", {cause : fetchInJson})
        }
        setLists(fetchInJson)
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
      const rawFetch = await fetch("https://sauce-backend.onrender.com/app/list", {
          credentials: "include"
      })
      const fetchInJson = await rawFetch.json()

      if(!rawFetch.ok){
          throw new Error("Err", {cause : fetchInJson})
      }
      setLists(fetchInJson)
      setListFetchStatus("completed")
      }
      catch(err){
          setListFetchStatus("error")
          console.log(err)
          console.log(err?.cause)
      }
      
  }

    const mappedLists = lists.map(({listName, listCoverImage, moviesInList, _id})=>{
        return <SingleSidebarList 
        setActiveListId={setActiveListId}
        activeListId={activeListId}
        key={_id}
        id={_id}
        listName={listName} 
        listCoverImage={listCoverImage}
        moviesInList={moviesInList} 
        />
    })

    const mappedFilteredList = filteredList.map(({listName, listCoverImage, moviesInList, _id})=>{
        return <SingleSidebarList 
        setActiveListId={setActiveListId}
        activeListId={activeListId}
        key={_id}
        id={_id}
        listName={listName} 
        listCoverImage={listCoverImage}
        moviesInList={moviesInList} 
        />
    })

    useEffect(()=>{
      if(!isSignedIn){
        console.log("not fetching")
        setListFetchStatus("completed")
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

    useEffect(() => {
      if (listIdToDelete == 0) return
      else {
        const n = lists.filter((list) => list._id !== listIdToDelete)
        if (n.length == 0) {
          navigate("/app")
          setFilteredList(n);
          setLists(n)
          getListsByUserWithoutLoading()
          return
        }
        setFilteredList(n);
        setLists(n)
        const onlyIds = n.map((list) => list._id)
        setAllListIds(onlyIds);
        if (listIdToDelete == onlyIds[0]) {
          navigate(`/app/list/${onlyIds[1]}`)
        } else {
          navigate(`/app/list/${onlyIds[0]}`)
        }
      }
    }, [listIdToDelete])

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

export default SidebarListContainer