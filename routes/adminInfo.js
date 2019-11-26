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

// get one user's information
router.get("/:adminid/:username", checkAdmin, (req, res, next) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if (!user) {
                return res.status.json({
                    message: "Can't find this user"
                })
            }
            return user._id;
        })
        .then(result => {
            Post.find({authorid: result})
                .then(posts => {
                    res.status(200).send(posts);
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;