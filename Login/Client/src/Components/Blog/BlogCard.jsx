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

  const [count, setCount] = useState(item.likes)

  const [edit, setEdit] = useState(false)

  const [comLength, setComLength] = useState(item.comments.length)


  

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
      url: `http://localhost:3002/api/feed/addLike/${item._id}/${authedUser._id}`,
      withCredentials: true
    })
      .then(res => {
        console.log("res", res)

          if(res.data.msg === "USER ALREADY LIKED" ){

            setCount(count - 1)
            console.log("user voted already")

          }else {

            setCount(count + 1)
            console.log("new vote")

          }


        
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


const handleViewUpdate = () => {
  console.log("HANDLE HIT")

  setComLength(comLength + 1)
}



  return (

    <div id="blogCard">
      {/* {console.warn("item", item)} */}
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



      <div id="blogCardFoot" className='border'>

        <button onClick={() => handleAddLike()}> {count} like</button>
        <button onClick={() => handleViewComments()}> view comments  {comLength}</button>
        <button onClick={() => setComment(!comment)}> add comments</button>


      </div>
      {comment && <AddComment handleViewUpdate={handleViewUpdate} id={item._id} item={item} setComment={setComment} comment={comment} />}
      {viewComment &&
        item?.comments.map((obj) => {
          return (

            <ViewComments key={item._id} obj={obj} />
          )
        })
      }


    </div>
  )
}

export default BlogCard