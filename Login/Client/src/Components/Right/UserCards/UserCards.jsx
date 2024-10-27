import React from 'react'
import "./usercards.css"
import { Link } from 'react-router-dom'

const UserCards = ({ item }) => {
    return (
        <div id="userCards">
            {console.log("ITEM", item)}
            <div id="userCardLeft">
                <div id="profileImg">
                    <img id="profileImg" src={item.profileImg} alt="profileImg" />  {/* NEW */}

                </div>

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