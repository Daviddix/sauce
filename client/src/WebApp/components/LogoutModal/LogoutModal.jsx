import { useAtom } from "jotai"
import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import "./LogoutModal.css"
import { refreshListAtom, refreshUserDetailsAtom } from "../../globals/atom"
import { useState } from "react"

function AddToListModal({setShowLogoutModal}) {
    const [loggingUserOut, setLoggingUserOut] = useState(false)
    const [refreshUserDetails, setRefreshUserDetails] = useAtom(refreshUserDetailsAtom)
    const [refreshList, setRefreshList] = useAtom(refreshListAtom)

    async function logUserOut(){
        try{
            const logoutResponse = await fetch("https://sauce-backend.onrender.com/app/user/logout", {
                credentials : "include" 
            })

            const jsonResponse = await logoutResponse.json()
            if(!logoutResponse.ok){
                throw new Error("err", {cause : jsonResponse})
            }
            setRefreshList(0)
            setRefreshUserDetails(true)
            setLoggingUserOut(true)
            setShowLogoutModal(false)
        }
        catch(err){
            alert(err)
            setLoggingUserOut(false)
            
        }
    }

  return (
    
    <div 
    onClick={()=>{
        setShowLogoutModal(false)
    }}
    className="logout-modal-overlay">
        <div 
        onClick={(e)=>{
            e.stopPropagation()
        }}
        className="logout-modal">
            <div className="logout-modal-header">
                <div className="list-header-text">
                    <h2 className="sub-sub-heading">Logout from Sauce</h2>
                    <p className="sub-body-style">Are you sure you want to Logout?</p>
                </div>

                <button
                onClick={()=>{
                    setShowLogoutModal(false)
                }}
                >
                <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            <div className="logout-modal-body">
            <button 
            onClick={logUserOut}
            className="primary-button button-text-style">
            {loggingUserOut && <div className="login-loader"></div>}
                Yes, Logout
            </button>
            <button 
            onClick={()=>{
                setShowLogoutModal(false)
            }}
            className="secondary-button button-text-style">No, Go Back</button>
                
            </div>
        </div>
    </div>

  )
}

export default AddToListModal