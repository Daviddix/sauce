import addListIcon from "../../../assets/app assets/icons/add-list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"

import {allAnimeAtom, animeIdToAddToListAtom, userInfoAtom, refreshListAtom} from "../../globals/atom"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"

function NewListModalAnime({setShowAddNewListModal, notifyForAnimeAddedToList, notifyForAddToListError, setShowListModal}) {
    const [allAnime, setAllAnime] = useAtom(allAnimeAtom)
    const [id, setId] = useAtom(animeIdToAddToListAtom)
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)
    const [newListName, setNewListName] = useState("")
    const [creatingNewList, setCreatingNewList] = useState(false)


    async function addAnimeToNewList(e, name){
        try{ 
        e.preventDefault()
        setCreatingNewList(true)
        const animeToAddToList = allAnime.filter((anime)=> anime.animeId == id)[0]
        const listData = {
            listName : name,
            listCoverImage : animeToAddToList.animePoster,
            animeInList : [animeToAddToList],
            listAuthor : userInfo._id,
        }
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/list/anime", {
            credentials : "include",
            headers: {
                "Content-Type": "application/json"
              },
            body : JSON.stringify(listData),
            method : "POST"
        })
        const fetchJson = await rawFetch.json()
        if(!rawFetch.ok){
            throw new Error("Err", {cause : fetchJson})
        }
        setCreatingNewList(false)
        setShowAddNewListModal(false)
        setShowListModal(false) 
        notifyForAnimeAddedToList(newListName)
        setRefreshList((prev)=> prev+1)
        }
        catch(err){
            setCreatingNewList(false)
            notifyForAddToListError()
            
        }
       
    }
  return (
    <div className="add-list-modal-overlay">
        <div className="add-list-modal">
            <div className="add-list-modal-header">
                <img src={addListIcon} alt="list icon" />

                    <h2 className="sub-sub-heading">New List</h2>

                <button onClick={()=>{
                    setShowAddNewListModal(false)
                }}>
                <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            <div className="add-list-modal-body">
                <form 
                onSubmit={(e)=>{
                    addAnimeToNewList(e, newListName)
                }}
                >
                    <label className="input-label" htmlFor="new-list">List Name</label>
                    <br />
                    <input 
                    onChange={(e)=>{
                        setNewListName(e.target.value)
                    }}
                    value={newListName}
                    className="text-input" 
                    required
                    type="text" />

                    <button className="primary-button button-text-style">
                       {
                        creatingNewList?
                        <div className="login-loader"></div>
                        :
                        "Add to this List"
                       }
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewListModalAnime