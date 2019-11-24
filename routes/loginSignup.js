const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                password: hash,
                postNumber: 0,
                birth: req.body.birth,
                description: req.body.description
            });
            user.save().then(result => {
                res.status(201).json({
                    result: result
                })
                .catch(err => {
                    console.log(err);
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post("/login", (req, res, next) => {
    let tempUser;
    User.findOne({ username: req.body.username})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            tempUser = user;
            return bcrypt.compare(req.body.password, user.passowrd)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({username: tempUser.username, userId: tempUser._id}, "this_is_a_top_secret", {expiresIn: "1h"});
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});

router.post("/adminLogin", (req, res, next) => {
    let tempAdmin;
    User.findOne({ username: req.body.username})
        .then(admin => {
            if (!admin) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            tempAdmin = admin;
            return bcrypt.compare(req.body.password, admin.passowrd)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({username: tempAdmin.username, userId: tempAdmin._id}, "this_is_a_top_secret", {expiresIn: "1h"});
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});

module.exports = router;