const express = require('express');
const router = express.Router();

// const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const checkAdmin = require("../middleware/check-admin");

// get forum's total information
router.get("/:adminid", checkAdmin, (req, res, next) => {
    Post.count({}).then(count => {
        res.status(200).send(count);
    })
    .catch(err => {
        res.status(500).send({
            error: err
        });
    });
});

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
router.get("/:adminid/serach/:timestamp/posts", checkAdmin, (req, res, next) => {
    var start = req.params.timestamp;
    var end = new Date();
    end.setDate(end.getDate() + 86400000);
    Post.count({timestamp: {"$gte": start, "$lt": end}})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            return res.status(401).json({
                error: err
            });
        })

}); 

// get daily count of comments
router.get("/:adminid/search/:timestamp/comments", checkAdmin, (req, res, next) => {
    var start = req.params.timestamp;
    var end = new Date();
    end.setDate(end.getDate() + 86400000);
    Comment.count({timestamp: {"$gte": start, "$lt":end}})
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                return res.status(401).json({
                    error: err
                });
            });
});

module.exports = router;