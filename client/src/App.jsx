import {Route, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import Login from "./WebApp/Pages/Login/Login"
import Signup from "./WebApp/Pages/Signup/Signup"

function App() {

  return (
   <Routes >
    <Route path='/' element={<LandingPage />} />
    <Route path='/app/login' element={<Login />} />
    <Route path='/app/signup' element={<Signup />} />

   </Routes>
  )
}

export default App
