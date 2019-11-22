var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

const loginSignupRoutes = require('./routes/loginSignup');

mongoose.connect("mongodb+srv://hay55:Aq010101%45@hanlincluster-oe0wu.mongodb.net/test?w=majority", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, X-Requested-With,Origin, X-Requested-With,Content-Type,Accept");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

app.use("/loginSignup", loginSignupRoutes);

const port = 5000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

