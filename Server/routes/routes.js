const UserController = require("../controllers/users.Controller")
const FeedController = require("../controllers/feed.Controller")
const AuthCheck = require("../middleware/AuthCheck")
const User = require("../models/user.model")
const Feed = require("../models/feed.model")

module.exports = (app) => {

    app.get("/test", UserController.testRoute)
    
    app.get("/test",(req, res) => {
        console.log("TEST route HIT!!!")
        res.json({ msg: "Hello World!" })
    },)






    app.post("/api/registration", UserController.registration)

    app.post("/api/login",  UserController.login)

    app.get("/api/logout/:id", UserController.logout)

    app.get("/api/auth/", UserController.userAuth)

    app.get("/api/finduser/:id",  UserController.findUser)
    
    app.get("/api/allUsers", UserController.allUsers)

    app.put("/api/addFriend/", AuthCheck, UserController.addFriend)


    // NEW for img upload

    app.post( "/api/user/updateProfileImg/:id", UserController.updateProfileImg) 

    // **********************************
    // Feed routes

    app.get("/api/feed/getFeeds", FeedController.getFeeds)
    app.post("/api/feed/createFeed", FeedController.createFeed)
    app.delete("/api/feed/delete/:id", FeedController.deleteFeed)
    
    app.get("/api/feed/addLike/:id/:user" , FeedController.addLike)

    app.post("/api/feed/addComment/:id" , FeedController.addComment)

    app.post("/api/feed/editFeed/:id" , FeedController.editFeed)

}





// app.get("/test", UserController.testRoute)

// app.post("/api/registration", UserController.registration)

