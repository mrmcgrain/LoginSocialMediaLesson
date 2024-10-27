import React from 'react'
import "./right.css"

import { useData } from "../../hooks/context-hook"

import UserCards from './UserCards/UserCards'
const Right = ({ children }) => {

    const { allUsers, authedUser } = useData()


    return (
        <>
            {console.log("ALLUSERS", allUsers)}
            {console.log("authedUser", authedUser)}
            <div id="routerRight" className="routerBorder">
                <p>Online Users</p>

                {/* {children} */}

                {allUsers && allUsers.map((item) => {
                    return (
                        
                        <UserCards key={item._id} item={item} />

                    )
                })}

                <br />
                <br />
                <br />
                <hr style={{ width: '100%' }} />
                <div >

                    <p>Online Friends</p>

                </div>

                {authedUser && authedUser.friends.filter((obj) => obj.status == "Approved").map((item) => {
                    return (
                        <UserCards item={item} />

                    )
                })}

            </div>


        </>
    )
}

export default Right