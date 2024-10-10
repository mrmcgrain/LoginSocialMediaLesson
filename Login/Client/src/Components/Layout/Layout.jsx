import { useState } from 'react'
import "./layout.css"

import Header from "../Header/Header"
import Left from "../Left/Left"
import Center from "../Center/Center"
import Right from "../Right/Right"
import Footer from "../Footer/Footer"

import Landing from "../Landing/Landing"
import { useOutlet, Outlet } from 'react-router-dom'
import BlogModal from '../Blog/BlogModal'


import {useData} from "../../hooks/context-hook"

function Layout() {

const { modal } = useData()
  // let outlet = useOutlet()

  return (
    <>

{/* {modal &&  <BlogModal />} */}

<div id="routeContainer">

<Header />

<div id="routerBody">

  <Left />

  <Center>
     {/* <Landing />  */}

  </Center>


  <Right>


  </Right >

</div>

{/* <Footer /> */}


</div>

    </>
  )
}

export default Layout
