var express = require("express"),
    app = express(),
    path = require("path");
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

const loginSignupRoutes = require('./routes/loginSignup');
const postsRoutes = require('./routes/posts');
const infoRoutes = require("./routes/info");

mongoose.connect("mongodb+srv://hay55:Aq010101-@hanlincluster-oe0wu.mongodb.net/test?w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, X-Requested-With,Origin, X-Requested-With,Content-Type,Accept,Authorization");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(bodyParser.json());
app.use("/loginSignup", loginSignupRoutes);
app.use("/posts", postsRoutes);
app.use("/info", infoRoutes);

const port = 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

