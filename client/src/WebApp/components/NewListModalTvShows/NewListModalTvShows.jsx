import addListIcon from "../../../assets/app assets/icons/add-list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"

import {allTvShowsAtom, tvShowIdToAddToListAtom, userInfoAtom, refreshListAtom} from "../../globals/atom"
import {useState } from "react"
import { useAtom } from "jotai"

function NewListModalTvShows({setShowAddNewListModal, notifyForTvShowAddedToList, notifyForAddToListError, setShowListModal}) {
    const [allTvShows, setAllTvShows] = useAtom(allTvShowsAtom)
    const [id, setId] = useAtom(tvShowIdToAddToListAtom)
    const [userInfo, setUserInfo] = useAtom(userInfoAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)
    const [newListName, setNewListName] = useState("")
    const [creatingNewList, setCreatingNewList] = useState(false)




    async function addTvShowToNewList(e, name){
        try{ 
        e.preventDefault()
        setCreatingNewList(true)
        const tvShowToAddToList = allTvShows.filter((tvShow)=> tvShow.tvShowId == id)[0]
        const listData = {
            listName : name,
            listCoverImage : tvShowToAddToList.tvShowPoster,
            tvShowsInList : [tvShowToAddToList],
            listAuthor : userInfo._id,
        }
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/list/tv", {
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
        notifyForTvShowAddedToList(newListName)
        setRefreshList((prev)=> prev+1)
        }
        catch(err){
            console.log(err)
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
                    addTvShowToNewList(e, newListName)
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

export default NewListModalTvShows