import "./TicketSkeleton.css"

function TicketSkeleton() {
  return (
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
  )
}

export default TicketSkeleton