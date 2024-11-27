import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


import { useData } from "../../hooks/context-hook"


const Landing = () => {

    const nav = useNavigate()

    const { authedUser, handleLogout } = useData()



    // useEffect(() => {
    //     console.log("UseEffect Fired!!!", authedUser)
    //     if (!authedUser._id) {

    //         nav("/")
    //     }
 
    // }, [authedUser])



    return (
        <>
            {console.log("authed", authedUser)}

            {/* <div>Landing</div> */}

            {/* <p>{`Welcome Back ${authedUser.username}`}</p> */}

            <br />
            <br />
            <br />
            <br />
            {/* <button onClick={handleLogout}>Logout</button> */}

        </>


    )
}

export default Landing