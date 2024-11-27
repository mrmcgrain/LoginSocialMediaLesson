import React from 'react'
import "./messages.css"

import ChatCard from './ChatCard/ChatCard'
const Messages = () => {

    return (
        <>

        <div id="Messages">

            <div id="chats">

                   <ChatCard/>

                   <ChatCard/>

                   <ChatCard/>

                   <ChatCard/>
                

            </div>



            <div id="messageContent">          
                  <p>You have no new messages</p>
                  <p>Select a contact to read</p>
            </div>

        </div>
        </>

    )
}

export default Messages