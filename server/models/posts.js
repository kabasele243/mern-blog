import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    fileUpload: String,
    upvote: {
        type: Number,
        default: 0,
    },
    creator: String,
    createdAt: {
        type: Date,
        default: new Date,
    },
})

let Post = mongoose.model('Post', postSchema);

export default Post;