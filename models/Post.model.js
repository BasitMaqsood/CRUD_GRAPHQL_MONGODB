const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description:{
        type: String
    }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
