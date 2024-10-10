import React from 'react'
import { Outlet, useOutlet} from "react-router-dom"
import Landing from "../Landing/Landing"

import "./center.css"

const Center = () => {


    const outlet = useOutlet();

    return (
        <>
            {console.log("outlet", outlet ? true : false)}

            <div
                className='routerBorder'
                id="centerContainer"
            >

                {/* <h1>center</h1> */}

                {/* <Outlet /> */}
{/* <Landing /> */}
                {outlet ?   <Outlet /> : <Landing />}

            </div>

        </>

    )
}

export default Center