const express = require('express');
const router = express.Router();

// const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const checkAdmin = require("../middleware/check-admin");

// get one user's posts
router.get("/:adminid/:username/posts", checkAdmin, (req, res, next) => {
    Post.find({author: req.params.username})
        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => {
            return res.status(401).json({
                error: err
            });
        });
});

// get one user's comments
router.get("/:adminid/:username/comments", checkAdmin, (req, res, next) => {
    Comment.find({author: req.params.username})
            .then(comments => {
                res.status(200).send(comments);
            })
            .catch(err => {
                return res.status(401).json({
                    error: err
                })
            });
});

// get daily count of posts
router.get("/:adminid/search/:timestamp", checkAdmin, (req, res, next) => {
    var start = req.params.timestamp;
    console.log(start);
    let tempResult = 0;
    var startTime = new Date(start * 1000);
    var endTime = startTime;
    endTime.setDate(endTime.getDate() + 1);
    console.log(startTime);
    console.log(endTime);
    Post.count({timestamp: {"$gte": startTime, "$lt": endTime}})
        .then(result => {
            tempResult = result;
            Comment.count({timestamp: {"$gte": startTime, "$lt": endTime}})
                    .then(count => {
                        tempResult = tempResult + count;
                        res.status(200).send(tempResult);
                    })
                    .catch(err => {
                        return res.status(401).json({
                            error: err
                        })
                    });
        })
        .catch(err => {
            return res.status(401).json({
                error: err
            });
        })

}); 

module.exports = router;