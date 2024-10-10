import React, { useState } from 'react'
import "./blog.css"
import Card from "./Card"

// What do we need to make a working blog?
// need a way to capture a users input onChange   <input>  or  <textarea>
// need a handler to collect the onChange and store in state
// We need somewhere to hold the new text that was submitted
// useState
// Need state to hold all the blog posts
// need to map through all the posts to render on screen
// need a submit button onClick and a handler to update the main blog state with
// new blog or comment 



const Blog = () => {

  const [newBlog, setNewBlog] = useState("")  //  new blog
  const [blogs, setBlogs] = useState([])  //  all blogs

  // const [edit, setEdit] = useState(false)

  const handleChange = (e) => {
    setNewBlog(e.target.value)
  }


  const handleSubmit = () => {
    if (newBlog.length > 0) {
      setBlogs((prev) => {
        return [...prev, newBlog];
      });
      setNewBlog("")
    }
  }


  ////////////////////////////////////////////////////////

  const handleDelete = (e) => {
    console.log("DELETE HIT", e.target.id)

    let filter = blogs.filter((item) => item !== e.target.id)

    setBlogs(filter)

    console.log("filter", filter)
  }

  //////////////////////////////////////////////////////////

  const handleUpdateEdit = (id, editPost) => {
    console.log("handleUpdateEdit", id)
    console.warn("id =", id, "editPost = ", editPost)
    console.warn("blogs.indexOf(id)", blogs.indexOf(id))

    
    // console.warn("slice(1,index)", blogs.slice(0, index))
    // console.warn("slice(index)", blogs.slice(index + 1))
    
    // console.warn([...blogs.slice(0, index), editPost, ...blogs.slice(index + 1)])
    
    // setBlogs([...blogs.slice(0, index), editPost, ...blogs.slice(index + 1)])
    let index = blogs.indexOf(id)

    let temp = [...blogs]   //create copy of state [ ]

    console.log("temp", temp)

    temp[index] = editPost  //  bracket notation to change value of a specific index to "editpost"
 

    console.log("all blogs", temp)

    setBlogs(temp)   //  set State to the new array with the updated content


    //here we set state to include edited item with slice()
    // let arr = [   1,    2,    3   ]
  }

  //use slice to copy before and after it with modified entry






  return (

    <>
      {console.log("blogs", blogs)}
      {console.log("newBlog", newBlog)}
      <div>Blog</div>

      <input
        value={newBlog}
        onChange={(e) => handleChange(e)}
        placeholder="What's on your mind?">

      </input>

      <button id='blogSubmit' onClick={() => handleSubmit()}>submit</button>
      <div>
        {blogs.length
          ?
          (
            blogs.map((item) => {

              return (

                <Card key={item}
                  item={item} handleUpdateEdit={handleUpdateEdit} handleDelete={handleDelete} />

              )
            })
          )
          :
          (null)
        }



      </div>

    </>

  )

}

export default Blog