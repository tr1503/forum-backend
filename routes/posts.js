const express = require('express');
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/comment");
const checkAuth = require("../middleware/check-auth");

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

router.post("/", checkAuth, (req, res, next) => {
    const post = new Post({
        authorid: req.body.authorid,
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        timestamp: Date.now(),
        comments: [],
        tags: req.body.tags,
        images: req.body.images
    });
    post.save().then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        return res.status(401).json({
            error: err
        });
    });
});

// for the page of editing the post
router.get("/:id/edit", checkAuth, (req, res, next) => {
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

router.put("/:id/edit", checkAuth, (req, res, next) => {
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

// for adding likes in post
router.put("/:id/like", checkAuth, (req, res, next) => {
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
router.put("/:id/:commentid/like", checkAuth, (req, res, next) => {
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

// for the page of editing comment
router.get("/:id/:commentid/edit", checkAuth, (req, res, next) => {
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

router.put("/:id/:commentid/edit", checkAuth, (req, res, next) => {
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

router.post("/:id/newComment", checkAuth, (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            const comment = new Comment({
                postid: req.params.id,
                authorid: req.body.authorid,
                content: req.body.content,
                likes: 0,
                timestamp: Date.now()
            });
            Comment.create(comment, (err, comment) => {
                if (err) {
                    return res.status(401).json({
                        error: "Save comment failed"
                    });
                }
                else {
                    post.comments.push(comment);
                    post.save();
                    res.status(200).send(post);
                }
            });
        }
    });
});

module.exports = router;