var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var authModel = require('../models/authModel');


router.post('/register', (req, res) => {
    var auth = new authModel();
    auth.username = req.body.username;
    auth.password = req.body.password;
    auth.email = req.body.email || "";

    auth.save()
        .then((user) => {
            sendToken(user, res)
        })
        .catch((err) => {
            sendAuthError(res)
        })

})


router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    authModel.findOne({username})
            .then((user) => {                   
                var isMatch = user.comparePassword(password, user.password);          
                if (isMatch) {
                    sendToken(user, res)
                } else {
                    sendAuthError(res)
                }
            })
            .catch((err) => {                
                sendAuthError(res)          
            })
})


function sendToken(user, res) {
    var token = jwt.sign({user}, 'phupro');
    res.json({success: true, username: user.username, token, _id: user._id})
}

function sendAuthError(res) {
    res.json({success: false, message: "Username or Password incorrect"})
}


module.exports = router;