var express = require('express');

var jwt = require('jsonwebtoken');
var router = express.Router();
var voteModel = require('../models/voteModel').voteModel;
var choiceModel = require('../models/voteModel').choiceModel;
var commentModel = require('../models/commentModel');
var authModel = require('../models/authModel');



router.get('/myvote/:user_id', checkAuthenticated, (req, res) => {  
    let user_id = req.user.user._id;
    authModel.findById(user_id).populate('votes')
        .then((votes) => {           
            res.json(votes);
        })
})






router.get('/votes', (req, res) => {
    voteModel.find({})
        .then((results) => {
            res.json(results)
        })
})

router.get('/votes/:id', (req, res) => {
    voteModel.findById(req.params.id)
        .populate('choices')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: authModel
            }
        })
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
})


router.post('/votes', checkAuthenticated, (req, res) => {
    var question = req.body.question;
    var choices = req.body.choices;
    var author = req.user.user._id;

    voteModel.create({ question, author })
        .then((result) => {
            let new_choices = []
            for (let choice of choices) {
                new_choices.push({ text: choice, vote_id: result._id })
            }

            authModel.findById(author)
                    .then((user) => {                       
                        user.votes.push(result);
                        user.save();
                    })

            choiceModel.create(new_choices)
                .then((datas) => {
                    for (let data of datas) {
                        result.choices.push(data);
                    }
                    result.save()
                        .then((dt) => {
                            res.json(dt);
                        })
                })
        })
})




router.put('/votes/:id', checkAuthenticated, (req, res) => {
    voteModel.findByIdAndUpdate(req.params.id, { question: req.body.question })
        .then((result) => {
            res.status(200).json({ "success": true })
        })
})

router.delete('/votes/:id', checkAuthenticated, (req, res) => {
    voteModel.findById(req.params.id)
        .then((result) => {
            for (let id of result.choices) {
                choiceModel.findByIdAndRemove(id).exec()
            }
            result.remove()
                .then(() => {
                    res.json({ "success": true })
                })
                .catch(() => {
                    res.json({ 'success': false })
                })
        })
        .catch(() => {
            res.json({ 'success': false })
        })
})


router.post('/votes/:id/comments', checkAuthenticated, (req, res) => {   
    voteModel.findById(req.params.id)
        .then((vote) => {
            commentModel.create({ author: req.user.user._id || "", text: req.body.text || "" })
                .then((comment) => {

                    vote.comments.push(comment);
                    vote.save()
                        .then(() => {
                            res.json(comment)
                        })
                })
                .catch((err) => {
                    res.json(err);
                })

        })


})

router.delete('/votes/:vote_id/comments/:comment_id', checkAuthenticated, (req, res) => {
    let vote_id = req.params.vote_id;
    let comment_id = req.params.comment_id;
    commentModel.findByIdAndRemove(comment_id)
                .then((comment) => {
                    voteModel.findById(vote_id)
                            .then((vote) => {
                                let comments = vote.comments;
                               for (let i in comments) {
                                   if (comments[i] == comment_id) {
                                       delete vote.comments[i];
                                   }
                               }
                               vote.save()                   
                                .then(() => {                                 
                                     return res.json(comment);
                                })
                            });
                          
                })
})

router.post('/choices', checkAuthenticated, (req, res) => {
    let vote_id = req.body.vote_id;
    let choices = req.body.choices;
    let create_new = [];
    if (typeof (choices) !== 'string') {
        for (let text of choices) {
            create_new.push({ vote_id, text })
        }
    } else {
        create_new.push({ vote_id, text: choices })
    }

    choiceModel.create(create_new)
        .then((result) => {
            voteModel.findById(vote_id)
                .then((vote) => {
                    for (let data of result) {
                        vote.choices.push(data);
                    }
                    vote.save()
                })
            res.json(result)
        })
})

router.put('/choices/:id', checkAuthenticated, (req, res) => {
    let choice_id = req.params.id;
    let text = req.body.choices;
    choiceModel.findByIdAndUpdate(choice_id, { text: text })
        .then((result) => {
            res.json({ "success": true })
        })
        .catch(() => {
            res.json({ "success": false })
        })
})


router.post('/choices/:id/rating', checkAuthenticated, (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let choice_id = req.params.id;
    choiceModel.findById(choice_id)
        .then((result) => {
            if (result.ips.indexOf(ip) === -1) {
                result.ips.push(ip);
                result.save()
                    .then((data) => {
                        res.json(data)
                    })
            } else {
                return;
            }

        })
})


router.get('/clientIP', (req, res) => {
    let ipAdress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return res.status(200).json({ 'success': true, 'ipAdress': ipAdress })
})



function checkAuthenticated(req, res, next) {

    if (!req.header('authorization'))
        return res.status(401).send({ message: 'Unauthorized requested. Missing authentication header' });

    var token = req.header('authorization').split(' ')[1];

    var payload = jwt.decode(token, 'phupro');


    if (!payload)
        return res.status(401).send({ message: 'Unauthorized requested. Authentication header invalid' });

    req.user = payload;



    next();
}



module.exports = router;
