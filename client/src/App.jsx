import {Outlet, Route, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import Login from "./WebApp/Pages/Login/Login"
import Signup from "./WebApp/Pages/Signup/Signup"
import DashboardLayout from "./WebApp/Pages/DashboardLayout/DashboardLayout"
import Lists from "./WebApp/Pages/Lists/Lists"
import Home from "./WebApp/Pages/Home/Home"

function App() {

  return (
   <Routes >
    <Route path='/' element={<LandingPage />} />
    <Route path='/app/login' element={<Login />} />
    <Route path='/app/signup' element={<Signup />} />
    
    <Route path='/app/' element={<DashboardLayout><Outlet /></DashboardLayout>}>
        <Route index element={<Home />} />
        <Route path='list' element={<Lists />} />
      </Route>

   </Routes>
  )
}

export default App
