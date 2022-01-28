var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express()
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function (req, res) {
    var FullName= req.body.fullname;
    var UserName=req.body.username;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phoneNumber;
    var Gender=req.body.gender;

    var data = {
        "name": FullName,
        "username": UserName,
        "email": email,
        "password": pass,
        "phoneNumber": phone,
        "Gender": Gender
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });


    return res.redirect('Sign_Up_Success.html');
})
app.post('/feedback_form', function (req, res) {
    var firstName = req.body.userFirstName;
    var lastName = req.body.userLastName;
    var email = req.body.userEmail;
    var phoneNumber = req.body.userPhoneNumber;
    var usermsg=req.body.userMessage;

    var data = {
        "fname": firstName,
        "lname": lastName,
        "email": email,
        "phone": phoneNumber,
        "usermsg":usermsg
    }
    db.collection('feedback').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });
    return res.redirect('feedback_success.html');
})

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('SignUp.html');
}).listen(3000)


console.log("server listening at port 3000");