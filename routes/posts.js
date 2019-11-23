const express = require('express');
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/comment");

router.get("/", (req, res, next) => {
    Post.find({})
        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get posts failed"
            });
        });
});

router.get("/:tag", (req, res, next) => {
    Post.find({tags: req.params.tag})
        .then(posts => {
            res.status(200).send(posts);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get posts failed"
            });
        });
});

router.post("/", (req, res, next) => {
    const post = new Post({
        authorid: req.body.authorId,
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        timestamp: Date.now,
        comment: [],
        tags: req.body.tags,
        images: req.body.images
    });
    post.save().then(result => {
        res.status(200).send(result);
    });
});

// for the page of editing the post
router.get("/:id/edit", (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            res.status(200).send(post);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get post failed"
            });
        });
});

router.put("/:id", (req, res, next) => {
    var title = req.body.title;
    var content = req.body.content;
    Post.findOneAndUpdate({_id: req.params.id}, {"$set": {title: title, content: content}}, {new: true})
        .then(post => {
            res.status(200).send(post);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Update post failed"
            });
        });
});

// for the page of editing comment
router.get("/:id/:commentid/edit", (req, res, next) => {
    Comment.findById(req.params.commentid)
        .then(post => {
            res.status(200).send(comment);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Get comment failed"
            });
        });
});

router.put("/:id/:commentid", (req, res, next) => {
    var content = req.body.content;
    Comment.findOneAndUpdate({_id: req.params.commentid}, {"$set": {content: content}}, {new: true})
        .then(comment => {
            res.status(200).send(comment);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Update comment failed"
            })
        });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).populate("comments").exec((err, post) => {
        if (err)
            console.log(err);
        else 
            res.status(200).send(post);
    });
});

router.post("/:id", (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.redirect("/");
        } else {
            // frontend needs to send a comment object
            Comment.create(req.body.comment, (err, comment) => {
                if (err)
                    console.log(err);
                else {
                    post.comments.push(comment);
                    post.save();
                    res.status(200).send(post);
                }
            });
        }
    });
});

// for adding likes in post
router.put("/:id/like", (req, res, next) => {
    Post.findOneAndUpdate({_id: req.params.id}, {$inc: {likes: 1}}, {new: true})
        .then(post => {
            res.status(200).send(post);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Add likes failed"
            })
        })
});

// for adding likes in comments
router.put("/:id/:commentid/like", (req, res, next) => {
    Comment.findByIdAndUpdate({_id: req.params.commentid}, {$inc: {likes: 1}}, {new: true})
        .then(comment => {
            res.status(200).send(comment);
        })
        .catch(err => {
            return res.status(401).json({
                message: "Add likes failed"
            })
        })
});

router.delete("/:id", (req, res, next) => {
    Post.findById(req.params.id)
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
                    Post.findByIdAndRemove(req.params.id, (err, end) => {
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

router.delete("/:id/:commentid", (req, res, next) => {
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