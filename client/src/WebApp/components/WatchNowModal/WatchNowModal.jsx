import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import watchIcon from "../../../assets/app assets/icons/watch-icon.svg"
import rightUpIcon from "../../../assets/app assets/icons/right-up-icon-ticket.svg"
import "./WatchNowModal.css"
import { useState } from "react"

function WatchNowModal({setShowWatchModal, movieId}) {
    const [fetchStatus, setFetchStatus] = useState("loading")
    async function getWatchProvidersDetails(){
        try{
            setFetchStatus("loading")
            const raw = await fetch(`http://localhost:3000/app/movie/${movieId}/watch-providers`)
            const rawInJson = await raw.json()
            console.log(rawInJson) 
        }
        catch(err){
            setFetchStatus("error")
        }
    }

    function closeModal(){
        setShowWatchModal(false)
    }
  return (
    <div className="watch-now-overlay">
        <div className="watch-now-modal">
            <div className="watch-now-header">
                <img src={watchIcon} alt="tv icon" />

                <div className="watch-now-text">
                    <h2 className="sub-sub-heading">Where to Watch</h2>
                    <p className="sub-body-style">Services to watch this movie</p>
                </div>

                <button
                onClick={()=>{
                    closeModal()
                }}
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
            </div>

            {fetchStatus == "completed" &&
            <>
            <div className="watch-now-region">
                <h2>Region</h2>
                <select name="region" id="region">
                    <option value="US">US</option>
                </select>
            </div>

            <div className="tickets-container">
                <div className="tickets-container-inner">
                    <div className="ticket">
                        <div className="ticket-provider-image"></div>

                        <div className="other-ticket-info">
                            <div className="heading-arrow">
                                <h1>Watch on Netflix</h1>
                                <img src={rightUpIcon} alt="up icon" />
                            </div>

                            <div className="ticket-chips">
                                <span>Rent</span>
                                <span>HD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </>
            }

            {
                fetchStatus == "loading" && 
                <>
                <div className="region-skeleton">
                    <div className="region-heading-skeleton"></div>

                    <div className="region-select-skeleton"></div>
                </div>

                <div className="tickets-container">
                <div className="tickets-container-inner">
                    <div className="ticket-skeleton">
                        <div className="ticket-provider-image"></div>

                        <div className="other-ticket-info">
                            <div className="heading-arrow">
                            </div>

                            <div className="ticket-chips">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-skeleton">
                        <div className="ticket-provider-image"></div>

                        <div className="other-ticket-info">
                            <div className="heading-arrow">
                            </div>

                            <div className="ticket-chips">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </>
            }

        </div>
    </div>
  )
}

export default WatchNowModal