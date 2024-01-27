const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const tagsScheme = mongoose.Schema({
    title: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

module.exports = mongoose.model('Tags', tagsScheme);