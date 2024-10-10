const User = require("../models/user.model");
const Feed = require("../models/feed.model")
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken")

module.exports = {

    getFeeds: (req, res) => {
        console.log("GET FEED HIT")
        Feed.find()
            .then((found) => {
                console.log("found", found)
                res.json(found)
            })
    },

    createFeed: (req, res) => {
        console.log("req.body", req.body)
        Feed.create(req.body)
            .then(created => {
                console.log("created", created)
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
        console.log("addLike", req.params.id)
        // still need to track who has liked in a [] so they can not vote twce
        Feed.findByIdAndUpdate({
            _id: req.params.id
        },
            { $inc: { likes: 1 } }
        )
            .then(found => {
                console.log(found)
                // found.likes ++
                // found.save
                // res.json(found)
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
    }
}

