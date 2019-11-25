const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    authorid: Schema.Types.ObjectId,
    title: String,
    content: String,
    likes: Number,
    timestamp: {type: Date, default: Date.now()},
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    tags: [String],
    images: [String]
});

module.exports = mongoose.model("post", PostSchema);