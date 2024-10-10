const JWT = require("jsonwebtoken")
const User = require("../models/user.model")


module.exports = 


    (req, res, next) => {
        console.log("req.cookies", req.cookies.jwt)
        console.log("MIDDLE WARE HITTTTTTTTTTTTTTT")
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
                        console.log("IS THIS ME?", found)
                       res.locals.user = found
        next()

                    })

            } else {
                res.json({ message: "token expired" })
            }
        }


    }
