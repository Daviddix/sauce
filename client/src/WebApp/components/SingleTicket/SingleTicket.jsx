import rightUpIcon from "../../../assets/app assets/icons/right-up-icon-ticket.svg"
import "./SingleTicket.css"

function SingleTicket({quality, type, link, service}) {
    const ticketBorderColor = {border : `solid ${service.themeColorCode + "33"} 1.99px`}

  return (
    <div 
        style={ticketBorderColor}
        className="ticket">
        <div className="ticket-provider-image">
            <img src={service.imageSet.lightThemeImage} alt="provider logo" />
        </div>

        <div className="other-ticket-info">
            <div className="heading-arrow">
                <h1>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                    Watch on {service.name}</a></h1>
                <img src={rightUpIcon} alt="up icon" />
            </div>

            <div className="ticket-chips">
                {quality && <span>{quality}</span>}
                {type && <span>{type}</span>}
            </div>
        </div>
    </div>
  )
}

export default SingleTicket