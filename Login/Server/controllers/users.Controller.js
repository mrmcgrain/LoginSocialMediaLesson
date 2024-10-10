const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken")

module.exports = {

    testRoute: (req, res) => {
        console.log("TEST route HIT!!!")
        res.json({ msg: "Hello World!" })
    },


    registration: (req, res) => {
        console.log("Registration HIT", req.body)

        const { username, password, first, last, email } = req.body

        User.findOne({ username: req.body.username })

            .then((found) => {
                console.log("found", found)

                if (!found) {
                    const hash = bcrypt.hashSync(password, 10)
                    const newUser = new User({
                        first: first,
                        last: last,
                        username: username,
                        email: email,
                        password: hash
                    })

                    User.create(newUser)
                        .then(created => {
                            console.log("created", created)
                            created.save()
                        })
                } else {
                    res.json({ msg: "InValid Registration" })
                }
            })

    },


    login: (req, res) => {
        console.log("LOGIN hit", req.body)
        User.findOne({ username: req.body.username })
            .then((found) => {
                console.log("found", found)
                if (!found) {
                    res.json({ msg: "Invalid Login" })
                } else {


                    const passwordMatch = bcrypt.compareSync(req.body.password, found.password)

                    if (!passwordMatch) {
                        res.json({ msg: "Invalid Login" })
                    } else {

                        const payload = {
                            username: found.username,
                            _id: found._id,
                            email: found.email
                        }

                        const token = JWT.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" })

                        console.log("token", token)

                        // found.token = token
                        found.isOnline = true
                        found.save()



                        res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 })
                            .status(200)
                            .json({ message: "Logged in successfully", token: token, found })

                    }
                }



            })

    },

    logout: (req, res) => {
        console.log("req.params", req.cookie, req.cookies)
        // res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'Strict' });

        res
            .clearCookie('jwt')
            .cookie("jwt", "LOGGEDOUT", { expiresIn: new Date(Date.now) }).status(201).json({ "Logged": "Out" })



        User.findById(req.params.id)
            .then(found => {
                console.log("found", found)
                found.isOnline = false
                found.save()
            })



    },

    userAuth: (req, res) => {
        // console.log("req.cookies", req.cookies.jwt)
        if (!req.cookies['jwt']) {

            console.log("no cookie")
            res.json({ msg: "Not Authed" })
        }
        if (req.cookies['jwt']) {
            console.log("about to verify")
            let decode = JWT.verify(req.cookies['jwt'], process.env.SECRETKEY)
            console.log("JWT verified", decode)
            if (decode._id) {

                // res.json({ message: "proceed", user: decode, _id: decode._id })

                User.findById(decode._id)
                    .then(found => {
                        res.json(found)
                    })

            } else {
                res.json({ message: "token expired" })
            }
        }



    },


    allUsers: (req, res) => {

        User.find({ isOnline: true })
            .then(found => {
                // console.log("found" ,found)
                res.json(found)
            })
    },

    findUser: (req, res) => {
        console.log("findUser hit, req.params", req.params)
        User.findById(req.params.id)
            .then(found => {
                console.log("found", found)
                res.json(found)
                // now how to fwd to that users page
            })
    },
    addFriend: (req, res) => {
        console.log("adding friend", req.body)
        const user = res.locals.user

        User.findById(user._id) // Logged In User
            .then(found => {
                console.log("Current User", found, "req.body.id", req.body.id)
                let filter = found.friends.filter((obj) => obj._id.toString() === req.body.id.toString())
                console.log("filter", filter)

                if (filter.length) {

                    if (filter[0].status == "Requested") {
                        console.log("requested to approved")
                        filter[0].status = "Approved"
                        found.save()
                    } else if (filter[0].status == "Removed") {
                        filter[0].status = "Pending"
                        found.save()
                    } else if
                        (filter[0].status == "Approved") {
                        console.log("requested to remove")
                        filter[0].status = "Removed"
                        found.save()
                    }
                }

                User.findById(req.body.id) // freiend to add
                    .then(userFound => { // friend to add
                        let filter2 = userFound.friends.filter((obj) => obj._id.toString() === user._id.toString())
                        console.log("filter2", filter2)
                        if (filter2.length) {

                            if (filter2[0].status == "Pending") {
                                console.log("pending to approved")
                                filter2[0].status = "Approved"
                                userFound.save()
                                res.json({msg : "friend added"})
                                // filter2.save()
                                // socket.emit("addstatus", userFound._id)
                            } else if (filter2[0].status === "Removed") {
                                filter2[0].status = 'Requested'
                                userFound.save()
                            } else
                                if (filter2[0].status === "Approved") {
                                    // console.log("pending to approved")
                                    filter2[0].status = "Removed"
                                    userFound.save()
                                    // filter2.save()
                                    // socket.emit("addFriend", userFound._id)
                                }


                            // } else {
                        } else if (found.friends.filter((obj) => obj._id !== userFound._id)) {
                            //  let adding = userFound.filter((obj) => obj.userId === req.user._id)

                            // } else if(found.friends.filter((obj) => obj.userId !== userFound._id){


                            // if FOUND has friend userFound and friend === pending, change ot approved....

                            found.friends.push({
                                username: userFound.username,
                                _id: userFound._id,
                                status: "Pending",
                                created: new Date()
                            })
                            found.save()
                            // console.log("useerFound-2nd add friend", userFound)
                            // console.log("req friends add", req.user)
                            userFound.friends.push({
                                username: found.username,
                                _id: found._id,
                                status: "Requested",
                                created: new Date()
                            })
                            userFound.save()
                                .then(added => {
                                    // console.log("Updated User", added, "found", found)
                                    res.json(added)
                                }
                                )
                                .catch(err => console.log("Error adding friend", err))
                        }
                    })
            })
    },
    // addFriend: (req, res) => {
    //     console.log("###", res.locals.user)
    //     console.log("reqBd", req.body)

    //     const user = res.locals.user
    //     console.log("user", user)

    //     User.findById(req.body.id)
    //         .then(found => {
    //             console.log("found", found)
    //             if (found) {

    //                 let filter = found.friends.filter((obj) => obj._id.toString() === user._id.toString())
    //                 console.log("FILTER", filter)

    //                 if (filter.length) {

    //                     if (filter[0].friend == "Pending") {
    //                         console.log("requested to approved")
    //                         filter[0].friend = "Approved"
    //                         found.save()
    //                     } else if (filter[0].friend == "Removed") {
    //                         // filter[0].friend = "Pending"
    //                         // found.save()
    //                     } else if
    //                         (filter[0].friend == "Approved") {
    //                         console.log("requested to remove")
    //                         // filter[0].friend = "Removed"
    //                         // found.save()
    //                     }
    //                 }
    //             }





    //             User.findById(user._id)
    //                 .then(MyUser => {
    //                     console.log("MyUser", MyUser)


    //                     if (MyUser) {

    //                         let filter2 = MyUser.friends.filter((obj) => obj._id.toString() === req.body.id.toString())
    //                         console.log("filter2", filter2)
    //                         if (filter2.length) {

    //                             if (filter2[0].friend === "Requested") {
    //                                 console.log("pending to approved")
    //                                 filter2[0].friend = "Approved"
    //                                 MyUser.save()
    //                                 // filter2.save()
    //                                 // socket.emit("addFriend", userFound._id)
    //                             } else if (filter2[0].friend === "Removed") {
    //                                 // filter2[0].friend = 'Requested'
    //                                 // MyUser.save()
    //                             } else
    //                                 if (filter2[0].friend === "Approved") {
    //                                     console.log("pending to approved")
    //                                     // filter2[0].friend = "Removed"
    //                                     // MyUser.save()
    //                                     // filter2.save()
    //                                     // socket.emit("addFriend", userFound._id)
    //                                 }


    //                             // } else {
    //                         } else if (found.friends.filter((obj) => obj._id !== user._id)) {

    //                             const payload1 = {
    //                                 username: user.username,
    //                                 _id: user._id,
    //                                 status: "Requested"
    //                             }

    //                             found.friends.push(payload1)
    //                             found.save()

    //                             const payload2 = {
    //                                 username: found.username,
    //                                 _id: found._id,
    //                                 status: "Pending"
    //                             }
    //                             MyUser.friends.push(payload2)
    //                             MyUser.save()
    //                         }
    //                     }
    //                 });
    //         });
    // }
}









































