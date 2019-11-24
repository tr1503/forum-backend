const express = require('express');
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Admin = require("../models/admin");

// get user's information
router.get("/:id", (req, res, next) => {
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

// update personal description
router.post("/:id", (req, res, next) => {
    var description = req.body.description;
    User.findByIdAndUpdate({_id: req.params.id}, {$set: {description: description}})
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Update information failed"
            })
        });
});

// get user's posts
router.get("/:id/posts", (req, res, next) => {
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
router.get("/:id/comments", (req, res, next) => {
    Comment.distinct("postid", {authorid: req.params.id}).select({"postid": 1, "_id": 0})
        .then(comments => {
            return comments;
        })
        .then(result => {
            Post.find({_id: {$in: result}}, (err, posts) => {
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

// get forum's total information
router.get("/:adminid", (req, res, next) => {
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
router.get("/:adminid/:username", (req, res, next) => {
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
        })
})

module.exports = router;