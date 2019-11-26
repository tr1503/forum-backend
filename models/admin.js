const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

var AdminSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("admin", AdminSchema);