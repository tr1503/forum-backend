const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "this_is_a_top_secret_admin");
        next();
    } catch(error) {
        res.status(401).json({
            message: "Auth failed"
        });
    }
}