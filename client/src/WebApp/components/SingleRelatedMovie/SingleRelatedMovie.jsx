import { Link } from "react-router-dom";
import "./SingleRelatedMovie.css"
import { useAtom } from "jotai";
import { movieMatchPercentageAtom } from "../../globals/atom";

function SingleRelatedMovie({movieId, title, image,date}) {
  const [movieMatchPercentage, setMovieMatchPercentage] = useAtom(movieMatchPercentageAtom)

  return (
    <div className="single-related-movie">
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt="" />

      <Link 
      onClick={()=>{
        setMovieMatchPercentage(0)
      }}
      to={`/app/movie/${movieId}`}>
      <h1 className="sub-other-heading">
        {title}({date.slice(0, 4)})
      </h1>      
      </Link>
    </div>
  )
}

export default SingleRelatedMovie