const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "this_is_a_top_secret");
        req.userData = {
            username: decodedToken.username, 
            userId: decodedToken.userId, 
            birth: decodedToken.birth, 
            description: decodedToken.description
        };
        next();
    } catch(error) {
        res.status(401).json({
            message: "Auth failed"
        });
    }
}