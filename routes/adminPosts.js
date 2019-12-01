const express = require('express');
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/comment");
const checkAdmin = require("../middleware/check-admin");

router.delete("/:id/delete", checkAdmin, (req, res, next) => {
    Post.findById(req.body.postid)
        .then(post => {
            return post;
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Get post failed"
                });
            }
            Comment.remove({_id: {$in: result.comments}}, (err, comment) => {
                if (err)
                    console.log(err);
                else {
                    Post.findByIdAndRemove(req.body.postid, (err, end) => {
                        if (err) {
                            res.status(500).json({
                                error: err
                            })
                        }
                        else 
                            res.status(200).send(end);
                    });
                }
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Delete post failed"
            })
        });
});

router.delete("/:id/:commentid/delete", checkAdmin, (req, res, next) => {
    Comment.findByIdAndRemove(req.params.commentid, (err, comment) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else 
            res.status(200).json(comment);
    });
});

module.exports = router;