const User = require("../models/user.model");
const Feed = require("../models/feed.model")
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

// ////
const path = require('path')

/////

module.exports = {

    getFeeds: (req, res) => {
        // console.log("GET FEED HIT")
        Feed.find()
            .then((found) => {
                // console.log("found", found)
                res.json(found)
            })
    },

    createFeed: (req, res) => {
        console.log("req.body", req.body)
        console.log("req.body", req.body.feed)
        console.log("req.body", req.files)

        let feedData;

        feedData = JSON.parse(req.body.feed);


        Feed.create(feedData)
            .then(created => {
                console.log("created", created)

                if (req.files) {

                    let image = req.files.images;
                    image.name = image.name.replace(/\s/g, "");
                    image.mv(
                        path.resolve(process.cwd() + `/public/feed/${created._id}/img/`, image.name)),
                        async (err) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        }

                    created.img = `/public/feed/${created._id}/img/${image.name}`

                    created.save()

                }
                res.json(created)
            })

    },

    deleteFeed: (req, res) => {
        console.log("req.params", req.params)
        Feed.findByIdAndDelete(req.params.id)
            .then((deleted) => {
                console.log("deleted", deleted)
            })
    },




    addLike: (req, res) => {
        console.log("addLike", req.params)

        Feed.findById(req.params.id)
            .then(found => {
                console.log(found)
                if (found.liked.includes(req.params.user)) {
                    console.log("USER ALREADY LIKED")

                    found.liked = found.liked.filter((item) => item !== req.params.user)
                    found.likes -= 1
                    found.save()
                    //  decremet the number
                    res.json({ msg: "USER ALREADY LIKED" })

                } else {
                    console.log("USER  LIKED")
                    // push user Id into [ ] 
                    found.liked.push(req.params.user)
                    found.likes += 1
                    found.save()
                    res.json({ msg: "USER LIKED" })

                    //  inc  likes
                }
            })
    },

    editFeed: (req, res) => {
        console.log("reqPa", req.params)
        console.log("reqBd", req.body.update)
        Feed.findById({ _id: req.params.id })
            .then(found => {
                console.log("foundEdit", found)
                found.feedContent = req.body.update
                found.save()
            })
            .catch(err => console.log(err))
    },

    addComment: (req, res) => {
        console.log("add com", req.body)

        Feed.findById(req.body.OgFeed)
            .then(found => {
                console.log("addCom", found)
                found.comments.push(req.body)
                found.save()



            })



    }
}








// Feed.findById(req.body.OgFeed)
// .then(found => {
//     console.log("found", found)

//     found.comments.push(req.body)
//     found.save()

// })