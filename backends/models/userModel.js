let mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeIDE')
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    })

let userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema); 