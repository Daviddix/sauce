import "./GPTResponseSkeleton.css"

function GPTResponseSkeleton() {
  return (
    <div className="response-skeleton">
          <div className="response-image-skeleton"></div>

          <div className="skeleton-others">
            <div className="skeleton-heading"></div>

            <div className="skeleton-overview-container">
              <div className="skeleton-overview"></div>
              <div className="skeleton-overview"></div>
              <div className="skeleton-overview"></div>
              <div className="skeleton-overview"></div>
              <div className="skeleton-overview"></div>
              <div className="skeleton-overview"></div>
            </div>

            <div className="skeleton-button-container">
              <button></button>
              <button></button>
              <button></button>
              <button></button>
            </div>
          </div>
        </div>
  )
}

export default GPTResponseSkeleton