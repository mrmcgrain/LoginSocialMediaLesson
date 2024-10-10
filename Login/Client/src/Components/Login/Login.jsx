import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "./login.css"
import { useData } from "../../hooks/context-hook"
import Registration from '../Registration/Registration'

const Login = () => {

    const nav = useNavigate()

    const { handleLoggedInUser } = useData()

    const [login, setLogin] = useState({})

    const [reg, setReg] = useState(false)

    const handleRegister = () => {
        setReg(!reg)
    }

    const handleChange = (e) => {
        setLogin((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {

        axios({
            method: "POST",
            url: "http://localhost:3002/api/login",
            // url: "http://192.168.0.220:3002/api/login",
            data: login,
            withCredentials: true
        })
            .then(res => {
                console.log("res", res.data)
                handleLoggedInUser(res.data.found)
                nav("/blog")
            })
            .catch(err => console.log(err))


    }

    return (
        <>
            {console.log("login", login, "reg", reg)}

            {reg
                ?
                (
                    <div id="loginContainer"               >

                    <Registration  setReg={setReg} reg={reg}/>
                    </div>
                )
                :
                (
                    <div id="loginContainer"               >

                        <br />
                        <br />
                        <div>Welcome please login to proceed</div>
                        <br />
                        <br />
                        <input
                            name="username"
                            placeholder="username"
                            onChange={(e) => handleChange(e)}
                        >
                        </input >
                        <br />
                        <br />
                        <input
                            name="password"
                            placeholder="password"
                            onChange={(e) => handleChange(e)}
                        >
                        </input >
                        <br />
                        <br />
                        <button onClick={(e) => handleSubmit(e)}>Login</button>

                        <br />
                        <br />
                        <button onClick={(e) => handleRegister(e)}>Register</button>
                    </div>


                )
            }



        </>

    )
}

export default Login