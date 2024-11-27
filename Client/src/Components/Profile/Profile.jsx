import React, { useState } from 'react'
import "./profile.css"

import { useData } from "../../hooks/context-hook"
import FriendCardProfile from './FriendCardProfile/FriendCardProfile'
import axios from 'axios'

const Profile = () => {

    const { authedUser } = useData()

    // NEW  for img upload  
    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleImgChange = (e) => {
        console.log("img change", e.target.files[0])
        setSelectedFiles(e.target.files)  // add axios to send image to server


    }

    const handleUpdateProfileImg = (e) => {
        // axios to update profile
        console.log("update profile", selectedFiles)  // add img to the axios call    

        // axios for update profile and to store as user img somehow.......
        const formData = new FormData();
        formData.append("images", selectedFiles[0]);

        axios({
            method: 'post',
            url: `http://localhost:3002/api/user/updateProfileImg/${authedUser._id}`,
            data: formData,
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("res", res.data)
            })
            .catch(err => console.log("err", err))

    }

    return (
        <div id="Profile">
            {console.log("auth", authedUser, "selectedFiles", selectedFiles)}
            <div id="left">

                <div id="upLeft">

                    <div>Intro</div>
                    <div>short bio</div>

                    <button>edit </button>

                    <div>details</div>

                    <button>edit details </button>



                    <div>add feature</div>

                    <br />



                    <div>profile Image</div>

                    <br />

                    {authedUser.profileImg
                        ?
                        <img id="profileImg" src={authedUser.profileImg} alt="profileImg" />
                        :
                        null
                    }

                    <br />

                    <input type="file" onChange={(e) => handleImgChange(e)} />


                    <br />


                    <button onClick={(e) => handleUpdateProfileImg(e)}>Update Profile</button>


                </div>


                <div id="midLeft">


                    <div>Photos</div>
                    <div> gallery</div>
                    make a ternary, if not gallery, dont render this sectiuon

                </div>

                <div id="LowLeft">
                    <div>Friends List</div>
                    <br />
                    <br />
                    <div id="FriendCardContainers">
                        {authedUser.friends.length > 0
                            ?
                            (
                                authedUser.friends.map((item) => {
                                    return (

                                        <FriendCardProfile key={item._id} item={item} />

                                    )
                                })

                            )
                            :
                            (
                                null
                            )
                        }

                    </div>


                </div>



            </div>

            <div id="right">


                <div id="topRight">
                    <div> blogInput comp</div>
                </div>
                <div id="midRight">
                    <div> filters</div>
                </div>


                <div id="rightContent">
                    <div>BlogCard</div>
                    <div>BlogCard</div>
                    <div>BlogCard</div>
                    <div>BlogCard</div>

                </div>
            </div>



        </div>
    )
}

export default Profile