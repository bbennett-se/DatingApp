import './App.css'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import { useCookies } from 'react-cookie'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = ()  => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken
  return (
   <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      {authToken && <Route path = "/dashboard" element = {<Dashboard/>}/>}
      {authToken && <Route path = "/onboarding" element = {<Onboarding/>}/>}
    </Routes>
   </BrowserRouter>
  );
}

export default App
