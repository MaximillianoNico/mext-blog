const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({
    title: { type: String },
    body: { type: String },
    topic: { type: String },
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model(
    'Articles',
    article,
    'Articles'
);