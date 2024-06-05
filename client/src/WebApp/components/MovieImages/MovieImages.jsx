import { useEffect, useRef, useState } from "react"
import "./MovieImages.css"
import { useParams } from "react-router-dom"
import MovieImagesSkeleton from "../SkeletonLoaders/MovieImagesSkeleton/MovieImagesSkeleton"
import MovieImagesError from "../MovieImagesError/MovieImagesError"

function MovieImages() {
  const [images, setImages] = useState([])
  const [mainImageSrc, setMainImageSrc] = useState("")
  const [imagesFetchStatus, setImagesFetchStatus] = useState("loading")
  const mainImageRef = useRef()

  const mappedOtherImages = images.slice(0, 6).map((img)=>{
    return <img 
    key={img.file_path}
    onClick={()=>{
      mainImageRef.current.classList.remove("a")
      void mainImageRef.current.offsetWidth
      mainImageRef.current.classList.add("a")
      setMainImageSrc(img.file_path)
    }}
    className={mainImageSrc == img.file_path? "active" : ""}
    src={`https://image.tmdb.org/t/p/w1280/${img.file_path}`} 
    alt="" />
  })
  
  const {movieId} = useParams()
  
  useEffect(()=>{
    getMovieImages()
  }, [movieId])


  async function getMovieImages(){
    setImagesFetchStatus("loading")
    try{
      const rawFetch = await fetch(`https://sauce-backend.onrender.com/app/movie/${movieId}/images`)
      const jsonFetch = await rawFetch.json()

      if(!rawFetch.ok){
         throw new Error({cause : jsonFetch}) 
      }
      setImages(jsonFetch.backdrops)
      setImagesFetchStatus("completed")
      setMainImageSrc(jsonFetch.backdrops[0].file_path)
    }
    catch(err){
      setImagesFetchStatus("error")
      console.log(err)
    }
  }
  return (
    <>
    {
      imagesFetchStatus == "loading" &&  <MovieImagesSkeleton />
    }

    {
      imagesFetchStatus == "error" &&  <MovieImagesError refreshFromError={getMovieImages} />
    }

    {
      imagesFetchStatus === "completed" && 
      <div className="movie-images-section">
      <h1 className="subheading">Images</h1>
        <img src={`https://image.tmdb.org/t/p/w1280/${mainImageSrc}`} 
        ref={mainImageRef}
        alt="" 
        className="main-image a" />

      <div className="other-images-container">
          {mappedOtherImages}
      </div>
      
      </div>
    }
    
    </>
  )
}

export default MovieImages