import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from "react"
import TopTvShowDetails from '../../components/TopTvShowDetails/TopTvShowDetails'
import Thriller from '../../components/Thriller/Thriller'
import "./TvShowDetails.css"
import Images from '../../components/Images/Images'
import MoreTvShows from "../../components/MoreTvShows/MoreTvShows"
import RelatedTvShows from "../../components/RelatedTvShows/RelatedTvShows"

function TvShowDetails() {
    const {tvShowId} = useParams()

    useEffect(()=>{
        window.scroll({
          top:0,
          left:0,
          behavior : "smooth"
      })
      }, [tvShowId])
  return (
    <main className="tv-show-details-layout">
        <TopTvShowDetails />

        <div className="other-tv-show-details">
             <Thriller />

            <Images />

            
            <MoreTvShows />

            <RelatedTvShows />
        </div>
    </main>
  )
}

export default TvShowDetails