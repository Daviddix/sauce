import { useEffect, useRef, useState } from "react"
import "./Images.css"
import { useParams } from "react-router-dom"
import MovieImagesSkeleton from "../SkeletonLoaders/MovieImagesSkeleton/MovieImagesSkeleton"
import MovieImagesError from "../MovieImagesError/MovieImagesError"

function Images() {
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
  const {animeId} = useParams()
  const {tvId} = useParams()
  
  useEffect(()=>{
    getImages()
  }, [movieId])


  async function getImages(){
    setImagesFetchStatus("loading")
    let url
    if(movieId){
      url = `http://localhost:3000/app/movie/${movieId}/images`
      }else if(tvId){
      url = `http://localhost:3000/app/tv/${tvId}/images`
      }else if(animeId){
      url = `http://localhost:3000/app/anime/${animeId}/images`
      }
    try{
      const rawFetch = await fetch(url)
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
      imagesFetchStatus == "error" &&  <MovieImagesError refreshFromError={getImages} />
    }

    {
      imagesFetchStatus === "completed" && 
      <div className="images-section">
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

export default Images