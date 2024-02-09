import { useEffect, useState } from "react"
import testImage from "../../../assets/app assets/images/test.jpg"
import "./MovieImages.css"

function MovieImages() {
  const [images, setImages] = useState([])
  const mappedOtherImages = images.slice(0, 6).map((img, i)=>{
    if(i == 6) return
    return <img src={`https://image.tmdb.org/t/p/w1280/${img.file_path}`} alt="" />
  })
  useEffect(()=>{
    getMovieImages()
  }, [])

  async function getMovieImages(){
    try{
      const rawFetch = await fetch("http://localhost:3000/app/movie/2062/images")
      const jsonFetch = await rawFetch.json()

      if(!rawFetch.ok){
         throw new Error()
      }
      setImages(jsonFetch.backdrops)
    }
    catch{
      alert("an err")
    }
  }
  return (
    <div className="movie-images-section">
                <h1 className="subheading">Images</h1>
                <img src={`https://image.tmdb.org/t/p/w1280/${images[0]?.file_path}`} alt="" className="main-image" />

                <div className="other-images-container">
                    {mappedOtherImages}
                </div>
            </div>
  )
}

export default MovieImages