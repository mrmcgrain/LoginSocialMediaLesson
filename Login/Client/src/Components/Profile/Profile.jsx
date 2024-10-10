import React from 'react'
import "./profile.css"

import { useData } from "../../hooks/context-hook"
import FriendCardProfile from './FriendCardProfile/FriendCardProfile'

const Profile = () => {

    const { authedUser } = useData()


    return (
        <div id="Profile">
            {console.log("auth", authedUser)}
            <div id="left">

                <div id="upLeft">

                    <div>Intro</div>
                    <div>short bio</div>

                    <button>edit </button>

                    <div>details</div>

                    <button>edit details </button>



                    <div>add feature</div>

                    <div>profile Image</div>
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
                                        <FriendCardProfile item={item} />
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