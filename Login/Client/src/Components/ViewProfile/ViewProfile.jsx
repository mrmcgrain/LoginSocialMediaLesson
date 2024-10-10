import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useData } from "../../hooks/context-hook"
import axios from "axios"
const ViewProfile = () => {

    const [user, setUser] = useState()

    const loc = useLocation()
    const param = useParams()

    const { handleAddFriend } = useData()

    useEffect(() => {

        axios({
            method: "get",
            withCredentials: true,
            url: `http://localhost:3002/api/finduser/${param.id}`
        })
            .then(res => {
                console.log("FIIIIND USER", res)
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [loc])

    return (
        <>
            {console.log("loc", loc)}
            {console.log("param", param)}
            {console.log("user", user)}
            <div>ViewProfile</div>

            <p>{user?.username}</p>

            <button onClick={(e) => handleAddFriend(param.id)}>Add Friend</button>



        </>
    )
}

export default ViewProfile