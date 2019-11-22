const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment");

var PostSchema = new Schema({
    authorId: Schema.Types.ObjectId,
    title: String,
    content: String,
    timestamp: {type: Date, default: Date.now},
    comments: [Comment],
    images: [String]
});

module.exports = mongoose.model("post", PostSchema);