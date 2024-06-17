import { useState } from "react";
import downIcon from "../../../assets/app assets/icons/down-icon.svg";
import "./Categories.css"
import { useAtom } from "jotai";
import { searchCategoryAtom } from "../../globals/atom";

function Categories() {
    const [showCategoryPopup, setShowCategoryPopup] = useState(false)
    const [searchCategory, setSearchCategory] = useAtom(searchCategoryAtom)
  return (
    <div className="category-selector-container">
          {showCategoryPopup && <div className="all-categories-container">
            <h1 className="sub-sub-heading">Find</h1>

            <hr />

            <div className="categories">
              <button 
              onClick={()=>{
                setSearchCategory("Movies")
              }}
              className={searchCategory == "Movies"? "active" : ""}>Movies</button>

              <button 
              onClick={()=>{
                setSearchCategory("TV Shows")
              }}
              className={searchCategory == "TV Shows"? "active" : ""}>TV Shows</button>

              <button 
              onClick={()=>{
                setSearchCategory("Anime")
              }}
              className={searchCategory == "Anime"? "active" : ""}>Anime</button>
            </div>
          </div>}

          <button 
          onClick={()=>{
            setShowCategoryPopup((prev)=> !prev)
          }}
          className={showCategoryPopup?"categories-button rotate" : "categories-button"}>Anime <img src={downIcon} alt="" /></button>
        </div>
  )
}

export default Categories