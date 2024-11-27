import React, { useState } from 'react'

const Card = ({ item, handleDelete, handleUpdateEdit }) => {

    const [edit, setEdit] = useState(false) // T / F flag for my conditional rendering

    const [editPost, setEditPost] = useState(item) // the state for the changing post

    const handleEdit = (e, id) => {  // Changes the state edit to trigger boolean for conditional rendering

        console.log("Edit HIT", e.target.id, id)

        setEdit(!edit)
    }

    const handleEditChange = (e) => {
        console.log("edit Chagne", e.target.value)
        setEditPost(e.target.value)
    }

    const handleSubmit = (e) => {
        setEdit(!edit)
        handleUpdateEdit(e.target.id, editPost)
    }

    return (
        <div
            key={item}
            id={item}
            style={{ border: "solid grey 1px", margin: '12px' }}
        >

            {/* {console.warn("ITEM", item)} */}
            {edit
                ?
                (
                    <div>
                        <textarea
                            style={{ width: "422px", height: "122px" }}
                            placeholder='edit me'
                            value={editPost}
                            onChange={(e) => handleEditChange(e)}
                        ></textarea>

                        <div>
                            <button
                                id={item}
                                onClick={(e) => handleSubmit(e)}>
                                update
                            </button>
                        </div>

                    </div>
                )
                :
                (
                    <div>
                        <p>{item}</p>

                        <button
                            onClick={(e) => handleDelete(e)}
                            id={item}
                        >X</button>


                        <button
                            onClick={(e) => handleEdit(e, item)}
                            id={item}
                        >
                            edit
                        </button>

                    </div>
                )
            }
            {/* 
            {edit
                ?
                (
                    <div>
                        <button
                            id={item}
                            onClick={(e) => handleSubmit(e.target.id)}>update</button>
                    </div>
                )
                :
                (
                    <div>
                        <button
                            onClick={(e) => handleDelete(e)}
                            id={item}
                        >X</button>


                        <button
                            onClick={(e) => handleEdit(e, item)}
                            id={item}
                        >edit</button>

                    </div>
                )
            } */}


        </div>
    )
}

export default Card