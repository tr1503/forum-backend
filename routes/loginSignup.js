const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        birth: req.body.birth,
        description: req.body.description
    });
    user.save().
        then(result => {
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            return res.status(401).json({
                error: "Username exists"
            });
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
            return req.body.password === user.password;
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign({username: tempUser.username, userId: tempUser._id, birth: tempUser.birth, description: tempUser.description}, "this_is_a_top_secret", {expiresIn: "1h"});
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: tempUser._id,
                isAdmin: false
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
            const token = jwt.sign({username: tempAdmin.username, userId: tempAdmin._id}, "this_is_a_top_secret_admin", {expiresIn: "1h"});
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                adminId: tempAdmin._id,
                isAdmin: true
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});

module.exports = router;