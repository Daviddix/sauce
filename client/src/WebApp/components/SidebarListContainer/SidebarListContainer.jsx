import { useEffect, useState } from "react"
import "./SidebarListContainer.css"
import SingleSidebarList from "../SingleSidebarList/SingleSidebarList"
import SidebarListError from "../SidebarListError/SidebarListError"

function SidebarListContainer() {
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [lists, setLists] = useState([])
    const [activeListId, setActiveListId] = useState(0)

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
        setListFetchStatus("loading")
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

    useEffect(()=>{
        getListsByUser()
    }, [])
  return (
    <div className="lists-container">
        {
            listFetchStatus == "loading" && <div className="login-loader"></div>
        }
        {
            listFetchStatus == "completed" && mappedLists
        }
        {
            listFetchStatus == "error" && <SidebarListError refreshFromError={getListsByUser} />
        }
    </div>
  )
}

export default SidebarListContainer