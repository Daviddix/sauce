import { Link } from "react-router-dom";
import "./SingleRelatedAnime.css"
import { useAtom } from "jotai";
import { animeMatchPercentageAtom } from "../../globals/atom";

function SingleRelatedAnime({animeId, name, image,date}) {
  const [_, setAnimeMatchPercent] = useAtom(animeMatchPercentageAtom)

  return (
    <div className="single-related-anime">
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt={`poster for ${name}`} />

      <Link 
      onClick={()=>{
        setAnimeMatchPercent(0)
      }}
      to={`/app/anime/${animeId}`}>
      <h1 className="sub-other-heading">
        {name}({date.slice(0, 4)})
      </h1>      
      </Link>
    </div>
  )
}

export default SingleRelatedAnime