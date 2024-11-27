import { useState } from 'react'
import './App.css'
import Registration from './Components/Registration/Registration'
import Login from "./Components/Login/Login"

import { useData } from "./hooks/context-hook"
import { Navigate } from 'react-router-dom'

function App() {

  const { authedUser } = useData()

  return (
    <>

      {console.log("authedUser", authedUser)}
{console.log(Geolocation.getCurrentPosition())}


      <div id="LoginContainer">
        <Login />
      </div>


      
    </>
  )
}

export default App
