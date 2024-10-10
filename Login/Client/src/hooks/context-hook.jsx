import React, { createContext, useState, useContext } from "react"
import axios from 'axios'

const MyContext = createContext()

export const useData = () => useContext(MyContext)

export function MyProvider({ children }) {


    // Logged in user State
    const [authedUser, setAuthedUser] = useState({})

    // Logs in User and updates state
    const handleLoggedInUser = (input) => {
        console.log("input", input)
        setAuthedUser(input)
    }

    //Logout functionality
    const handleLogout = () => {

        function deleteCookie(name) {
            document.cookie = "jwt" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }


        axios({
            method: "GET",
            url: `http://localhost:3002/api/logout/${authedUser._id}`,
            withCredentials: true
        })
            .then((res) => {
                console.log("res", res)
            })
            .catch(err => console.log(err))

        setAuthedUser({})

    }

    const [modal, setModal] = useState(false)
    const handleModal = () => {
        setModal(!modal)
    }


    const [allUsers, setAllUsers] = useState([])

    const handleAllUsers = (input) => {

        // axios({
        //     method: "get",
        //     withCredentials: true,
        //     url: "http://localhost:3002/api/allUsers"
        // })
        // .then(res => {
        //     console.log("res", res)
        //     setAllUsers(res.data)
        // })
        setAllUsers(input)
    }

    const handleAddFriend = (id) => {
        console.log("id", id)
        axios({
            method: "put",
            url: `http://localhost:3002/api/addFriend/`,
            data: {id : id},
            withCredentials: true
        })
            .then(res => {
                console.log("res", res)
            })
    }

    const handleDelFriend = (id) => {
        console.log("id", id)
        // axios({
        //     method: "put",
        //     url: `http://localhost:3002/api/delFriend/${id}`,
        //     withCredentials: true
        // })
        //     .then(res => {
        //         console.log("res", res)
        //     })
    }

    // *************   FEED Logic

    const [newFeed, setNewFeed] = useState()

    

    const getFeeds = () => {

    }

    const handleNewFeed = (input) => {

        setNewFeed(input)





    }

    return (

        <MyContext.Provider

            value={{
                handleLoggedInUser,
                authedUser,
                handleLogout,
                handleModal,
                modal,
                allUsers,
                handleAllUsers,
                handleAddFriend,
                handleDelFriend,
                handleNewFeed,
                getFeeds, 
            }}
        >
            {children}

        </MyContext.Provider>

    )

}
export default MyProvider