import React, { useState } from 'react'
import "./addComment.css"
import { useData } from "../../hooks/context-hook"
import axios from 'axios'

const AddComment = ({ id, setComment, comment , item, handleViewUpdate}) => {

    const [addComment, setAddComment] = useState({})

    const { authedUser } = useData()

    const handleAddComment = (e) => {

        setAddComment({
            authorName: authedUser.username,
            authorId: authedUser._id,
            comment: e.target.value,
            created: Date.now(),
            OgFeed: id,
        })
    }

    const handleCommentSubmit = () => {

        // axios with state commment to a new route and model for comments
        axios({
            method: "post",
            url: `http://localhost:3002/api/feed/addComment/${item._id}`,
            data: addComment,
            withCredentials: true
        })
            .then(res => {
                console.log("res", res)
            })

        setComment(!comment)
        handleViewUpdate()

    }

    return (
        <>
            {console.log("comment", addComment)}
            <div id="AddComment">

                <div id="textArea2">

                    <textarea
                        onChange={(e) => handleAddComment(e)}
                        id="addCommentTextArea"></textarea>

                </div>

                <div id="submit">
                    <button onClick={() => handleCommentSubmit()}>submit</button>
                </div>
            </div>
        </>
    )
}

export default AddComment