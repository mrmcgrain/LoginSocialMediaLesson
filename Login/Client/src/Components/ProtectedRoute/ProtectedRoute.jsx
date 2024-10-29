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





// This error means that you're calling the navigate() function immediately when the ProtectedRoutes component renders, rather than within a React.useEffect hook. React Router's navigate() should only be triggered after the component has mounted (or updated), which ensures it doesn’t interfere with the initial render cycle. Let's go through how to fix it:

// Solution: Wrap navigate() in a useEffect Hook
// In ProtectedRoutes, place your navigate() call inside a useEffect. This way, navigate() only runs when the component mounts or when specified dependencies change. Here’s an example:

// jsx
// Copy code
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function ProtectedRoutes({ isAuthenticated, children }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check authentication status and navigate accordingly
//     if (!isAuthenticated) {
//       navigate('/login'); // Replace with your desired route
//     }
//   }, [isAuthenticated, navigate]); // Ensure dependencies are correct

//   // Render children if authenticated
//   return isAuthenticated ? children : null;
// }

// export default ProtectedRoutes;
// Explanation of Changes
// useEffect – This hook will run the navigate() function only after the component mounts or when isAuthenticated changes.
// Dependencies Array – Adding isAuthenticated and navigate in the dependencies array ensures that the effect runs whenever isAuthenticated changes, making sure the navigation occurs only if the authentication state changes.
// Why This Works
// Calling navigate() in useEffect allows the initial render cycle to complete, avoiding interference with the component mount process. This makes your ProtectedRoutes component safer and prevents React from throwing an error about calling navigate() outside of a side-effect.

// This approach should resolve the error and keep your navigation logic more reliable.