import React from 'react'
import "./FriendCardProfile.css"
import { Link } from 'react-router-dom'

const FriendCardProfile = ({ item }) => {

    return (
        <>

            <div id="FriendCardProfile">

                <div id="img">
                    <img src={`{$item.profileImg}`}>          </img>   
                        </div>

                <div id="lower">

                    <Link to={`/user/${item._id}`}>{item.username}</Link>
                    <p>{item.status}</p>

                </div>
            </div>
        </>
    )
}

export default FriendCardProfile