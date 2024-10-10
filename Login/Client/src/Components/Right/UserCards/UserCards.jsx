import React from 'react'
import "./usercards.css"
import { Link } from 'react-router-dom'

const UserCards = ({ item }) => {
    return (
        <div id="userCards">

            <div id="userCardLeft">
                <div id="profileImg"></div>

            </div>

            <div id="userCardMid">

                <Link to={`/user/${item._id}`}>{item.username}</Link>

            </div>

            <div id="userCardRight">
                <div id='GreenDot'></div>
            </div>

        </div>
    )
}

export default UserCards