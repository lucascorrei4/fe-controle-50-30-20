const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    secretCode: { type: String },
    email: { type: String },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', User)