import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate   } from 'react-router-dom'
import axios from 'axios'
import { useData } from "../../hooks/context-hook"

import Landing from "../Landing/Landing"

import Layout from "../Layout/Layout"

const ProtectedRoutes = () => {

    const { authedUser, handleLoggedInUser, handleAllUsers } = useData()

    let nav = useNavigate()


    useEffect(() => {

         console.log("useEftt  PROT TR")

        axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:3002/api/auth/`
        })
            .then(res => { //
                console.warn("PROT ROUTE auth res", res)
                if (res.data._id) {
                    console.log("protectedRoute.then.axios = res.data.username", res.data.username)
                    handleLoggedInUser(res.data)
                    // console.log("log", loggedIn)
                    // setLoggedIn(true)
                }else {
                    nav("/")
                }

                // }).then(() => {
                //     setLoggedIn(true)

            })
            .catch(err => {
                console.log("useAuth err", err);
            })

    }, [])

    useEffect(() => {

        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:3002/api/allUsers"
            // url: "http://192.168.0.220:3002/api/allUsers"
        })
        .then(res => {
            console.log("%%%%%%%%%%%%%%%%%", res)
            handleAllUsers(res.data)

        })
    }, [])


    return (
        <>
            {console.log("ProtectedRoute HIT", authedUser)}
{/* <Outlet /> */}
            {authedUser._id ? <Outlet /> : nav("/")}
        </>

    )
};

export default ProtectedRoutes
