const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

module.exports = mongoose.model('Posts', postSchema);