import listIcon from "../../../assets/app assets/icons/list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import { useEffect, useState } from "react"
import EmptyListState from "../EmptyListState/EmptyListState"
import ListSkeleton from "../SkeletonLoaders/ListSkeleton/ListSkeleton"
import AddToListModalError from "../AddToListModalError/AddToListModalError"
import { useAtom } from "jotai"
import { tvShowIdToAddToListAtom, refreshListAtom, allTvShowsAtom } from "../../globals/atom"
import toast from 'react-hot-toast'
import SingleListTvShow from "../SingleListTvShow/SingleListTvShow"
import NewListModalTvShows from "../NewListModalTvShows/NewListModalTvShows"

function AddToListModalTvShows({setShowListModal}) {
    const [lists, setLists] = useState([])
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [showAddNewListModal, setShowAddNewListModal] = useState(false)
    const [activeListId, setActiveListId] = useState(0)
    const [tvShowIdToAddToList, setTvShowIdToAddToList] = useAtom(tvShowIdToAddToListAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)
    const [allTvShows, setAllTvShows] = useAtom(allTvShowsAtom)
    const [addingToList, setAddingToList] = useState(false)

    const mappedLists = lists.map(({listName, listCoverImage, tvShowsInList, _id})=>{
        return <SingleListTvShow 
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
        getListsByUser()
    }, [])

    async function getListsByUser(){
        setListFetchStatus("loading")
        try{
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/list/tv/", {
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
            
            
        }
        
    }

    async function addTvShowToList(){
        setAddingToList(true)
        try {
          const tvShowToAddToList = allTvShows.filter(
            (tvShow) => tvShow.tvShowId == tvShowIdToAddToList
          )[0]
          const rawFetch = await fetch(
            `https://sauce-backend.onrender.com/app/list/tv/${activeListId}`,
            {
              credentials: "include",
              body: JSON.stringify({tvShowData : tvShowToAddToList}),
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          const jsonFetch = await rawFetch.json();
          if (!rawFetch.ok) {
            throw new Error({ cause: jsonFetch });
          }
          setAddingToList(false)
          setShowListModal(false)
          const {listName} = lists.filter((list) => list._id == activeListId)[0]
          notifyForTvShowAddedToList(listName)
          setRefreshList((prev)=> prev+1)
        } catch (err) {
            
            notifyForAddToListError()
            setAddingToList(false)
        }
        
    }

    function notifyForTvShowAddedToList(name){
        return toast.success(`Your tv show has been added to the list : -${name}`, {
            position : "bottom-right",
            style : {
                fontFamily : "manrope",
                fontSize : "14px",
                backgroundImage : "linear-gradient(to bottom right,rgb(196, 255, 201), transparent)",
                border : "2px solid white",
                boxShadow : "0 0 .4rem #00000018"
            },
            icon : "📃"
        })
    }

    function notifyForAddToListError(){
        return toast.error('Oops... An error ocurred when trying to add a tv show to a list', {
            position : "bottom-right",
            style : {
                fontFamily : "manrope",
                fontSize : "14px",
                backgroundImage : "linear-gradient(to bottom right,rgb(255, 210, 196), transparent)",
                border : "2px solid white",
                boxShadow : "0 0 .4rem #00000018"
            },
            icon : "📃"
        })
    }
  return (
    <>
    {!showAddNewListModal && 
    <div 
    onClick={(e)=>{
        setShowListModal(false)
    }}
    className="list-modal-overlay">
        <div 
        onClick={(e)=>{
            e.stopPropagation()
        }}
        className="list-modal">
            <div className="list-modal-header">
                <img src={listIcon} alt="list icon" />

                <div className="list-header-text">
                    <h2 className="sub-sub-heading">Add to list</h2>
                    <p className="sub-body-style">Please select a list to add this show to</p>
                </div>

                <button
                onClick={()=>{
                    setShowListModal(false)
                }}
                >
                <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            <div className="list-modal-body">

            {
                listFetchStatus == "loading" && 
                <ListSkeleton />
            }
            {
                listFetchStatus == "error" && 
                <AddToListModalError refreshFunction={getListsByUser} />
            }
            {
                listFetchStatus == "completed" && 
                    lists.length == 0?
                    <EmptyListState 
                    setShowAddNewListModal={setShowAddNewListModal} />
                    :
                    listFetchStatus == "completed" &&
                    <>
                    {mappedLists}
                    <button 
                    onClick={()=>{
                        setShowAddNewListModal(true)
                    }}
                    className="add-new-list">
                    <img src={plusIcon} alt="plus icon" />
                    New List
                    </button>
                    </>
            }

                
            </div>

            {lists.length !== 0 && 
            <div className="list-modal-bottom">
                    <button 
                    onClick={()=>{
                        addTvShowToList()
                    }}
                    disabled={activeListId == 0 || addingToList}
                    className="button-text-style primary-button">
                    {
                        addingToList?
                        <div className="login-loader"></div>
                        :
                        "Add to this List"
                       }    
                    </button>
            </div>}
        </div>
    </div>
    }

    {showAddNewListModal && 
    <NewListModalTvShows 
    setShowListModal={setShowListModal}
    notifyForTvShowAddedToList={notifyForTvShowAddedToList}
    notifyForAddToListError={notifyForAddToListError}
    setShowAddNewListModal={setShowAddNewListModal} />
    }
    </>
  )
}

export default AddToListModalTvShows