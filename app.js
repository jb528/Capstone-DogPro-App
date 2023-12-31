var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require("connect-flash");

require('dotenv').config();

var params = require("./params/params");
var setupPassport = require('./setuppassport');
var app = express();


mongoose.connect(params.DATABASECONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
setupPassport();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'kmkmjnjn32',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
