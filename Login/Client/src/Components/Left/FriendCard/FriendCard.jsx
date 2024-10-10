import React from 'react'
import "./friendCard.css"

import { useData } from "../../../hooks/context-hook"

const FriendCard = ({ item }) => {

    const { handleAddFriend, handleDelFriend } = useData()

    return (

        <div id="friendCard">

            {console.log("FriendCard Item", item)}
            <div id="friendCardPic">

                <div id="profileImg">

                </div>

            </div>

            <div id="friendCardRight">

                <div id="friendCardTop">

                    <div id="friendCardName">{item?.username}</div>
                    <div id="friendCardDate">date</div>

                </div>

                <div id="friendCardBottom">

                    <div id="confirm">

                        <p
                            onClick={(e) => handleAddFriend(item._id)}
                            // id={item?._id}
                            className="addFriendButton"
                        >confirm
                        </p>

                    </div>

                    <div id="del">
                        <p
                            onClick={(e) => handleDelFriend(item._id)}
                            // id={item?._id}

                            className="addFriendButton"
                        >del
                        </p>
                    </div>

                </div>
            </div>
            <div id="spacer"></div>


        </div>
    )
}

export default FriendCard