import { useState } from 'react'
import './App.css'
import Registration from './Components/Registration/Registration'
import Login from "./Components/Login/Login"

import { useData } from "./hooks/context-hook"

function App() {

  const { authedUser } = useData()

  return (
    <>

      {console.log("authedUser", authedUser)}



      <div id="LoginContainer">
        <Login />
      </div>


      
    </>
  )
}

export default App
