import React from 'react'
import "./nav.css"
import { useData } from "../../hooks/context-hook"
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { MdOutlineFeed } from "react-icons/md";
import { LuHome } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";


const Nav = () => {


  const {authedUser,  handleLogout } = useData()

  return (
    <div id="routerNav">



      <div id="rightPane">
      <Link to="/Profile">
          <img id="profileIMG" src={`${authedUser.profileImg}`}></img>
        </Link>


      </div>

      <div id="navPane">

        <Link to="/Profile">
          <CgProfile />
        </Link>


        <Link to="/messages">
          <TiMessages />
        </Link>

        <Link to="/blog">
          <MdOutlineFeed />
        </Link>

        <Link to="">
          <LuHome />
        </Link>

        <Link to="/search">
          <IoIosSearch />

        </Link>

      </div>

      <div id="logoutPane">

        <button id="logout" onClick={handleLogout}>Logout</button>

      </div>



    </div>
  )
}

export default Nav