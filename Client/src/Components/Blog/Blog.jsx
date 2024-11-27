import React, { useState, useEffect } from 'react'
import { useData } from "../../hooks/context-hook"
import BlogModal from './BlogModal'
import "./blog.css"
import axios from 'axios'

import BlogCard from "./BlogCard"

const Blog = () => {

    const [allFeeds, setAllFeeds] = useState()
    const [newFeed, setNewFeed] = useState({})
    // for image upload
    const [selectedFiles, setSelectedFiles] = useState([])

    const { handleModal, modal, authedUser, handleNewFeed } = useData()



    
    useEffect(() => {

        axios({
            method: 'get',
            url: "http://localhost:3002/api/feed/getFeeds",
            withCredentials: true
        })
            .then((res) => {
                console.log("res", res.data)
                setAllFeeds(res.data)
            })
            .catch(err => console.log("err", err))

        // axios to get all feeds from routes, save in local state and map the results

    }, [])

    const handleFeedChange = (e) => {

        setNewFeed({
            authorName: authedUser.username,
            authorId: authedUser._id,
            feedContent: e.target.value,
            created: Date.now(),
            likes: 0
        })

    }

    // //////////////////

    const handleCollectImg = (e) => {
        setSelectedFiles(e.target.files)
    }


    // ///////////


    const handleNewFeedSubmit = (e) => {
        e.preventDefault()

        console.log("submit hit", newFeed)

        const formData = new FormData();
        formData.append("feed", JSON.stringify(newFeed));
        formData.append("images", selectedFiles[0]);
        // axios with newFeed to server to add to database
        axios({
            method: 'post',
            // url: 'http://192.168.0.220:3002/api/feed/createFeed',
            url: 'http://localhost:3002/api/feed/createFeed',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        })
            .then(res => {
                console.warn("res", res)

                setAllFeeds(prev => [
                    ...prev,
                    res.data
                ])
                console.log("allFEEDS", allFeeds)


            })
            .catch(err => console.log(err))

        setNewFeed({
            feedContent: "",
        })
    }


    const handleDeleteFeed = (id) => {
        console.log("id", id)

        let filter = allFeeds.filter((obj) => obj._id !== id)

        console.log("filter", filter)

        setAllFeeds(filter)
    }


    return (
        <>

            {console.log("selectedFile", selectedFiles)}
            {console.log("newFeed", newFeed)}
            <div id="blog">

                <div id="blogHeader">

                    <div id="blogInput" >

                        <div id="blogInputContent">

                            <input id="blogInputFile"
                                type="file"
                                name="file"
                                onChange={(e) => handleCollectImg(e)}
                                className="inputfile" />


                            <button id="blogInputSubmit" onClick={(e) => handleNewFeedSubmit(e)}> submit</button>

                            <textarea id="textArea" onChange={(e) => handleFeedChange(e)}
                                value={newFeed.feedContent}
                                placeholder="What's on your mind">
                            </textarea>


                        </div>


                    </div>


                </div>
                {/* <br /> */}

                <div id='spacer'></div>


                <div id="blogBody">

                    <br />
                    <br />
                    {allFeeds && allFeeds.length > 0
                        ?
                        (
                            allFeeds
                                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                                .map((item) => (

                                    <div key={item._id} id="BlogCardContainer" >
                                        {/* {console.log("ITEM", item)} */}
                                        <BlogCard key={item.created} item={item} handleDeleteFeed={handleDeleteFeed}
                                        />

                                    </div>

                                ))
                        )
                        :
                        (
                            <p>No feeds available</p>
                        )}
                </div>





            </div>




        </>
    )
}

export default Blog