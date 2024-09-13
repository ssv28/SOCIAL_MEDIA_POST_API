const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'POST',
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    commentText: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const COMMENT = mongoose.model('COMMENT', commentSchema);
module.exports = COMMENT