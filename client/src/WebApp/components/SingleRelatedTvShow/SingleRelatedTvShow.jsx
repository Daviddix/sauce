import { Link } from "react-router-dom";
import "./SingleRelatedTvShow.css"
import { useAtom } from "jotai";
import { tvShowsMatchPercentageAtom } from "../../globals/atom";

function SingleRelatedTvShow({tvShowId, name, image,date}) {
  const [_, setTvShowMatchPercentage] = useAtom(tvShowsMatchPercentageAtom)

  return (
    <div className="single-related-tv-show">
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt={`poster for ${name}`} />

      <Link 
      onClick={()=>{
        setTvShowMatchPercentage(0)
      }}
      to={`/app/tv/${tvShowId}`}>
      <h1 className="sub-other-heading">
        {name}({date.slice(0, 4)})
      </h1>      
      </Link>
    </div>
  )
}

export default SingleRelatedTvShow