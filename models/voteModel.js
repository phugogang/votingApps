var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var voteSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },   
    question: {
        type: String,
        required: true,
        trim: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    date: {
        type: Date,
        default: Date.now
    },    
    choices: [{
        type: Schema.Types.ObjectId,
        ref: 'choices'
    }]
});


var choiceSchema = new Schema({
    vote_id: {
        type: Schema.Types.ObjectId,
        ref: 'vote'
    },
    text: {
        type: String, 
        trim: true,
        required: true
    },
    ips: [String]
})

module.exports.voteModel = mongoose.model('vote', voteSchema);
module.exports.choiceModel = mongoose.model('choices', choiceSchema);
