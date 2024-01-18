import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './LandingPage/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Routes >
    <Route path='/' element={<LandingPage />} />

   </Routes>
  )
}

export default App
