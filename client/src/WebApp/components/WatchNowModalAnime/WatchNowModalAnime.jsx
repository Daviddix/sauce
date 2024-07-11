import closeIcon from "../../../assets/app assets/icons/close-icon.svg"
import watchIcon from "../../../assets/app assets/icons/watch-icon.svg"
import { useEffect, useState } from "react"
import SingleTicket from "../SingleTicket/SingleTicket"
import TicketSkeleton from "../TicketSkeleton/TicketSkeleton"
import WatchNowModalError from "../WatchNowModalError/WatchNowModalError"
import EmptyServices from "../EmptyServices/EmptyServices"

function WatchNowModalAnime({setShowWatchModal, animeId}) {
    const [fetchStatus, setFetchStatus] = useState("loading")
    const [countries, setCountries] = useState([])
    const [mainCountry, setMainCountry] = useState("")
    const [tickets, setTickets] = useState([])
    const [allData, setAllData] = useState({})

    useEffect(()=>{
        getWatchProvidersDetails()
    }, [])

    async function getWatchProvidersDetails(){
        try{
            setFetchStatus("loading")
            const raw = await fetch(`http://localhost:3000/app/anime/${animeId}/watch-providers`)
            const rawInJson = await raw.json()
            if(!raw.ok){
                throw new Error({cause : rawInJson})
            }
            setAllData(rawInJson)
            const countriesFromRequest = Object.keys(rawInJson)
            if(countriesFromRequest.length == 0){
                return setFetchStatus("completed-empty")
            }
            setCountries(countriesFromRequest.sort())
            setMainCountry(countriesFromRequest[0])
            setTickets(rawInJson[countriesFromRequest[0]])
            setFetchStatus("completed")
        }
        catch(err){
            console.log(err)
            setFetchStatus("error")
        }
    }

    function closeModal(){
        setShowWatchModal(false)
    }

    const mappedOptions = countries.map((country)=>{
        return  <option value={country}>{country.toUpperCase()}</option>
    })

    const mappedTickets = tickets.map((ticket)=>{
        return <SingleTicket
        quality={ticket.quality}
        type={ticket.type}
        service={ticket.service}
        link={ticket.link}
        />
    })
  return (
    <div className="watch-now-overlay">
        <div className="watch-now-modal">
            <div className="watch-now-header">
                <img src={watchIcon} alt="tv icon" />

                <div className="watch-now-text">
                    <h2 className="sub-sub-heading">Where to Watch</h2>
                    <p className="sub-body-style">Services to watch this anime</p>
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
                <select 
                onChange={(e)=>{
                    setMainCountry(e.target.value)
                    setTickets(allData[e.target.value])
                }}
                name="region" id="region">
                {mappedOptions}
                 </select>
                
            </div>

            <div className="tickets-container">
                <div className="tickets-container-inner">
                    {mappedTickets}
                </div>
            </div>

            </>      
            }

            {
                fetchStatus == "completed-empty" && <EmptyServices />
            }

            {
                fetchStatus == "loading" && <TicketSkeleton />
            }

            {
                fetchStatus == "error" && <WatchNowModalError refreshFromError={getWatchProvidersDetails} />
            }

        </div>
    </div>
  )
}

export default WatchNowModalAnime