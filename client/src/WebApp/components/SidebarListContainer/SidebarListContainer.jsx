import { useEffect, useState } from "react"
import "./SidebarListContainer.css"
import SingleSidebarList from "../SingleSidebarList/SingleSidebarList"
import SidebarListError from "../SidebarListError/SidebarListError"
import { useAtom } from "jotai"
import { activeListIdAtom, allListIdsAtom, listIdToDeleteAtom } from "../../globals/atom"
import { useNavigate } from "react-router-dom"

function SidebarListContainer() {
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [lists, setLists] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [activeListId, setActiveListId] = useAtom(activeListIdAtom)
    const [listIdToDelete, setListIdToDelete] = useAtom(listIdToDeleteAtom)
    const [allListIds, setAllListIds] = useAtom(allListIdsAtom)
    const navigate = useNavigate()

    async function getListsByUser(){
        setListFetchStatus("loading")
        try{
        const rawFetch = await fetch("http://localhost:3000/app/list", {
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
        getListsByUser()
    }, [])

    useEffect(()=>{
        if(listIdToDelete == 0) return
       else{
         const n = lists.filter((list)=> list._id !== listIdToDelete)
         if(n.length == 0){
            navigate("/app")
            getListsByUser()
            return
         }
         setFilteredList(n)
         setLists(n)
         const onlyIds = n.map((list)=> list._id)
         setAllListIds(onlyIds)
         if(listIdToDelete == onlyIds[0]){
            navigate(`/app/list/${onlyIds[1]}`)
         }else{
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