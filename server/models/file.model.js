const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    folderId: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
});

const File = mongoose.model('File', fileSchema)

module.exports = File