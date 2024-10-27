const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')


// new stuff for file upload    
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(
    fileUpload({
      createParentPath: true,
    })
  );
app.use("/public/", express.static(process.cwd() + "/public"));




const cookieParser = require('cookie-parser'); // gives ability to view cookies
const Router = require("./routes/routes.js")
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cookieParser())    // give access to req.cookies 
app.use(express.json())   // Gives access to the req.body
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174" , 'http://192.168.0.220:5173'],
    credentials: true
}))

// app.get("/test", (req, res) => {
//     console.log("TEST route HIT!!!")
//     res.json({ msg: "Hello World!" })
// })


// app.post("/api/registration", (req, res) => {
//     console.log("Registration HIT", req.body)
//     res.json({ msg: "reg hit happy panda" })
// })

Router(app)

app.listen(port, () => {

    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected to Database")
    })
    console.log(`Server is running on port: ${port} and socket is connected`);
});
