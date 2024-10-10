import React from 'react'
import "./blog.css"
const ViewComments = ({ obj }) => {

    return (
        <>
            <div id="ViewCommentsContainer">

                {console.warn("obj", obj)}
                <p>{obj.authorName}</p>
                <p>{obj.created}</p>
                <p>{obj.comment}</p>
                <p>admin tools</p>
            </div>
        </>

    )
}

export default ViewComments