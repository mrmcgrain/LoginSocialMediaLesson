import React, { useState } from 'react'
import "./blog.css"
import { Link } from "react-router-dom"
import { useData } from "../../hooks/context-hook"
import axios from "axios"
import AddComment from './AddComment'
import ViewComments from "./ViewComments"

import timeAgo from "../../utils/dateParse"

const BlogCard = ({ item, handleDeleteFeed }) => {

  const { authedUser } = useData()

  const [comment, setComment] = useState(false)

  const [count, setCount] = useState(0)

  const [edit, setEdit] = useState(false)

  const handleFeedDelete = (e) => {
    console.log("del, e.tar.id", e.target.id)

    axios({
      method: 'delete',
      url: `http://localhost:3002/api/feed/delete/${e.target.id}`,
      withCredentials: true
    })
      .then((deleted) => {
        console.log("del", deleted)
      })

    handleDeleteFeed(e.target.id)

  }

  const handleAddLike = () => {
    // axios to server, find feed _id, inc likes

    axios({
      method: "get",
      url: `http://localhost:3002/api/feed/addLike/${item._id}`,
      withCredentials: true
    })
      .then(res => {
        console.log("res", res)
      })

  }

  const [viewComment, setViewComment] = useState(false)

  const handleViewComments = () => {
    // conditionally render the comments out and put a counter with how many commments
    setViewComment(!viewComment)

  }

  const [editing, setEditing] = useState('')

  const handleEdit = (input) => {
    console.log("iunput", input)
    setEditing(input)
    setEdit(!edit)

  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    console.log("handleedithit", editing)
    setEdit(!edit)

    // axios to a route to send the new req.body to overwrite the prevous one

    axios({
      method: 'post',
      url: `http://localhost:3002/api/feed/editFeed/${item._id}`,
      data: {update : editing},
      withCredentials: true
    })
      .then(res => {
        console.log("res", res)
      })
      .catch(err => console.log(err))


  }

  const handleEditChange = (e) => {
    console.log("e.tar.val", e.target.value)
    setEditing(e.target.value)

  }
  return (

    <div id="blogCard">
      {console.warn("editing", editing, item._id)}
      {/* {console.warn("$$$$$$$$", timeAgo(item.created))} */}

      <div id="blogCardTop" className='border'>


        <div id="BlogAuthor">

          <Link to={`/user/${item.authorId}`}>{item?.authorName} </Link>

        </div>

        {item?.authorName === authedUser.username
          ?
          (
            <div id="BlogAdmin">

              <div id="BlogEdit">

                <p onClick={() => handleEdit(item?.feedContent)}> edit </p>

              </div>

              <div id="BlogDelete">

                <p
                  id={item._id}
                  onClick={(e) => handleFeedDelete(e)}
                >
                  delete
                </p>

              </div>

            </div>
          )
          :
          (
            <div id="BlogAdmin">

              <div id="BlogEdit">

              </div>
              <div id="BlogDelete">

              </div>

            </div>
          )
        }

        <div id="BlogCreatedAt">

          <p>{timeAgo(item.created)} </p>

        </div>

      </div>


      {edit
        ?
        (
          <div id="EditIsLive">

            <textarea id="textArea"
              onChange={(e) => handleEditChange(e)}
              value={editing}></textarea>

            <button onClick={(e) => handleEditSubmit(e)}>Confirm Changes</button>

          </div>
        )
        :
        (
          <div id="blogCardMid" className='border'>

            <p>{item?.feedContent}</p>

          </div>)
      }



      {/* <div><p></p></div> */}

      <div id="blogCardFoot" className='border'>

        <div onClick={() => handleAddLike()}> {item.likes} like</div>
        <div onClick={() => handleViewComments()}> view comments  {item.comments.length}</div>
        <div onClick={() => setComment(!comment)}> add comments</div>
        {/* <div> add comments</div> */}


      </div>
      {comment && <AddComment id={item._id} item={item} setComment={setComment} comment={comment} />}
      {viewComment &&
        item?.comments.map((obj) => {
          return (

            <ViewComments obj={obj} />
          )
        })
      }


    </div>
  )
}

export default BlogCard