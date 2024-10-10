import React from 'react'
import "./left.css"
import FriendCard from './FriendCard/FriendCard'
import { useData } from "../../hooks/context-hook"
const Left = () => {

    const { authedUser } = useData()

    let Pending = authedUser?.friends?.filter((item) => {
        item.status == "Pending"
    })
    let approved = authedUser.friends.filter((item) => {
        item.status === "Approved"
    })
    let requested = authedUser.friends.filter((item) => {
        item.status === "Requested"
    })



    return (
        <>
            {console.log("authUsr", authedUser)}
            {console.log("pen", Pending, approved, requested)}
            <div id="routerLeft" className='routerBorder'>
                <p>Friend Request</p>
                {authedUser.friends.length > 0
                    ?
                    (
                        <>

                            {authedUser.friends.filter((obj) => obj.status == "Requested").map((item) => {
                                return (
                                    <FriendCard item={item} />

                                )
                            })}

                            {/* <p>view more</p> */}
                        </>
                    )
                    :
                    (
                        <p>Get some friends</p>

                    )}
                <hr style={{ width: '100%' }} />

                <p>Pending Request</p>
                {authedUser.friends.length > 0
                    ?
                    (
                        <>

                            {authedUser.friends.filter((obj) => obj.status == "Pending").map((item) => {
                                return (
                                    <FriendCard item={item} />

                                )
                            })}

                            {/* <p>view more</p> */}
                        </>
                    )
                    :
                    (
                        <p>Get some friends</p>

                    )}
                <hr style={{ width: '100%' }} />

                <p>Approved Friends</p>


                {authedUser.friends.length > 0
                    ?
                    (
                        <>

                            {authedUser.friends.filter((obj) => obj.status == "Approved").map((item) => {
                                return (
                                    <FriendCard item={item} />

                                )
                            })}

                            {/* <p>view more</p> */}
                        </>
                    )
                    :
                    (
                        <p>Get some friends</p>

                    )}

                <hr style={{ width: '100%' }} />
                <br />
                <p>unread messages</p>
                {/* <FriendCard /> */}
                {/* <FriendCard /> */}
                <p>view more</p>

            </div>


        </>
    )


}

export default Left