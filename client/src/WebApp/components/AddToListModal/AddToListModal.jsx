import listIcon from "../../../assets/app assets/icons/list-icon.svg"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import plusIcon from "../../../assets/app assets/icons/plus-icon.svg"
import SingleList from "../SingleList/SingleList"
import "./AddToListModal.css"
import { useEffect, useState } from "react"
import EmptyListState from "../EmptyListState/EmptyListState"
import NewListModal from "../../components/NewListModal/NewListModal"
import ListSkeleton from "../SkeletonLoaders/ListSkeleton/ListSkeleton"
import AddToListModalError from "../AddToListModalError/AddToListModalError"
import { useAtom } from "jotai"
import { movieIdToAddToListAtom, allMoviesAtom, refreshListAtom } from "../../globals/atom"
import toast from 'react-hot-toast'

function AddToListModal({setShowListModal}) {
    const [lists, setLists] = useState([])
    const [listFetchStatus, setListFetchStatus] = useState("loading")
    const [showAddNewListModal, setShowAddNewListModal] = useState(false)
    const [activeListId, setActiveListId] = useState(0)
    const [movieIdToAddToList, setMovieIdToAddToList] = useAtom(movieIdToAddToListAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)
    const [movies, setMovies] = useAtom(allMoviesAtom)
    const [addingToList, setAddingToList] = useState(false)

    const mappedLists = lists.map(({listName, listCoverImage, moviesInList, _id})=>{
        return <SingleList 
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

    async function getListsByUser(){
        setListFetchStatus("loading")
        try{
        const rawFetch = await fetch("https://sauce-backend.onrender.com/app/list/movies/", {
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

    async function addMovieToList(){
        setAddingToList(true)
        try {
          const movieToAddToList = movies.filter(
            (movie) => movie.movieId == movieIdToAddToList
          )[0]
          
          const rawFetch = await fetch(
            `https://sauce-backend.onrender.com/app/list/movies/${activeListId}`,
            {
              credentials: "include",
              body: JSON.stringify({movieData : movieToAddToList}),
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
          notifyForMovieAddedToList(listName)
          setRefreshList((prev)=> prev+1)
        } catch (err) {
            
            notifyForAddToListError()
            setAddingToList(false)
        }
        
    }

    function notifyForMovieAddedToList(name){
        return toast.success(`Your movie has been added to the list : -${name}`, {
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
        return toast.error('Oops... An error ocurred when trying to add a movie to a list', {
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
                    <p className="sub-body-style">Please select a list to add this movie to</p>
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
                        addMovieToList()
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
    <NewListModal 
    setShowListModal={setShowListModal}
    notifyForMovieAddedToList={notifyForMovieAddedToList}
    notifyForAddToListError={notifyForAddToListError}
    setShowAddNewListModal={setShowAddNewListModal} />
    }
    </>
  )
}

export default AddToListModal