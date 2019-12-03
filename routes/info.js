const express = require('express');
const router = express.Router();

// const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const SALT_FACTOR = 10;

// get user's information
router.get("/:id", checkAuth, (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get user failed"
            });
        });    
});

// update personal password and description
router.put("/:id", checkAuth, (req, res, next) => {
    var description = req.body.description;
    var password = req.body.password;
    // User.findByIdAndUpdate({_id: req.params.id}, {$set: {password: password, description: description}})
    //     .then(user => {
    //         res.status(200).send(user);
    //     })
    //     .catch(err => {
    //         return res.status(401).json({
    //             message: "Update information failed"
    //         })
    //     });
    User.findById(req.params.id)
        .then(user => {
            if (user.password === password) {
                User.findByIdAndUpdate({_id: req.params.id}, {$set: {description: description}})
                    .then(result => {
                        res.status(200).send(result);
                    })
                    .catch(err => {
                        return res.status(401).json({
                            error: err
                        })
                    });
            }
            else {
                bcrypt.genSalt(SALT_FACTOR).then(salt => {
                    bcrypt.hash(password, salt)
                        .then(hash => {
                            User.findByIdAndUpdate({_id: req.params.id}, {$set: {password: hash, description: description}})
                                .then(result => {
                                    res.status(200).send(result);
                                })
                                .catch(err => {
                                    return res.status(401).json({
                                        error: err
                                    });
                                });
                        });
                })
            }
        })
        .catch(err => {
            return res.status(401).json({
                message: "Update information failed"
            })
        })
});

// get user's posts
router.get("/:id/posts", checkAuth, (req, res, next) => {
    Post.find({authorid: req.params.id})
        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get posts failed"
            })
        })
})

// get user's comments
router.get("/:id/comments", checkAuth, (req, res, next) => {
    Comment.find({authorid: req.params.id}).select({"postid": 1, "_id": 0})
        .then(comments => {
            return comments;
        })
        .then(result => {
            posts = []
            result.forEach(element => {
                if (!(posts.includes(element)))
                    posts.push(element.postid);
            });
            Post.find({_id: {$in: posts}}).populate("comments").exec((err, posts) => {
                if (err) {
                    return res.status(401).json({
                        message: "Get posts failed"
                    });
                }
                res.status(200).send(posts);
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get comments failed"
            })
        })
});

module.exports = router;