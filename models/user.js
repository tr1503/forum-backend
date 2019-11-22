const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

var UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    postNumber: Number,
    birth: {type: Date, required: true},
    description: String
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", UserSchema);