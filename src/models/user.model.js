const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
})

userSchema.methods.toJSON = function(){
    const {_v,password, ...user} = this.toObject();

    return user;
}

module.exports = mongoose.model('Users', userSchema);