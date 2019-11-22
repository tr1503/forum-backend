const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
    postid: Schema.Types.ObjectId,
    authorid: Schema.Types.ObjectId,
    content: String,
    likes: Number,
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model("comment", CommentSchema);