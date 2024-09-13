const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    imageUrl: {          // Optional: link to an image if any
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    user: {          // Reference to the user who created the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    likes: [{                     // Users who liked the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        commentText: {
            type: String
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    }]

})

const POST = mongoose.model('POST', postSchema);
module.exports = POST