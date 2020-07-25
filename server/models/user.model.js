const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    folders: [{ name: { type: String }, isDeleted: { type: Boolean, required: true } }],
    isDeleted: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User