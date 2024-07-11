import noTicketsIcon from "../../../assets/app assets/icons/no-tickets.svg"
import "./EmptyServices.css"

function EmptyServices() {
  return (
    <div className="empty-service-state">
                <img src={noTicketsIcon} alt="empty service illustration" />
                <h2 className="other-heading">No Services Available</h2>
                <p className="tiny-body">Seems like there aren't any services available for you to stream this anime</p> 
     </div>
  )
}

export default EmptyServices