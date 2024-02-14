import {Outlet, Route, Routes} from "react-router-dom"
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import Login from "./WebApp/Pages/Login/Login"
import Signup from "./WebApp/Pages/Signup/Signup"
import DashboardLayout from "./WebApp/Pages/DashboardLayout/DashboardLayout"
import Lists from "./WebApp/Pages/Lists/Lists"
import Home from "./WebApp/Pages/Home/Home"
import MovieDetails from "./WebApp/Pages/MovieDetails/MovieDetails"

function App() {
  const dashboardTemplate = 
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>

  return (
   <Routes >
    <Route path='/' element={<LandingPage />} />
    <Route path='/app/login' element={<Login />} />
    <Route path='/app/signup' element={<Signup />} />
    <Route path='/app/movie/:movieId' element={<MovieDetails />} />
    
    <Route path='/app/' element={dashboardTemplate}>
        <Route index element={<Home />} />
        <Route path='list/:listId' element={<Lists />} />
      </Route>

   </Routes>
  )
}

export default App
