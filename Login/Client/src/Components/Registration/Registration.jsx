import React, { useState } from 'react'
import axios from "axios"

const Registration = ({setReg, reg}) => {

    const [data, setData] = useState({
    })

    const handleChange = (e, input) => {
        


        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: "post",
            url: "http://localhost:3002/api/registration",
            data: data
        })
            .then((res) => {
                console.log("res", res)
            })
            .catch(err => console.log(err))
            setReg(!reg)

    }

    return (
        <>
            {console.log("data", data)}
            <div>Registration</div>
            <br />
            <br />

            <input
                name="first"
                placeholder='First'
                value={data.first}
                onChange={(e) => handleChange(e)}
            >
            </input>

            <br />
            <br />
            <input required name="last" placeholder='Last' onChange={(e) => handleChange(e)}></input>
            <br />
            <br />
            <input required name="username" placeholder='username' onChange={(e) => handleChange(e)}></input>
            <br />
            <br />
            <input required name="email" placeholder='email' type='email' onChange={(e) => handleChange(e)}></input>
            <br />
            <br />
            <input required name="password" placeholder='password' onChange={(e) => handleChange(e)}></input>
            <br />
            <br />
            <input required name="confirmPassword" placeholder='confirmPassword' onChange={(e) => handleChange(e)}></input>
            <br />
            <br />
            <button 
            // disabled={data.password === data.confirmPassword ? false : true}
            onClick={(e) => handleSubmit(e)}>Submit</button>

        </>
    )
}

export default Registration