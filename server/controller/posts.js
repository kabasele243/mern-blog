import express from 'express';
import Post from '../models/posts.js';
import mongoose from 'mongoose';

const router = express.Router();

export const getAllPosts = async (req, res) => {
   
    try {
        const posts = await Post.find()
        console.log( { posts } )
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
}

export const addPost = async (req, res) => {
    const { title, description, fileUpload, creator, tags } = req.body;

    const createNewPost = new Post({
        title,
        description,
        fileUpload,
        creator,
        tags
    })
    try {
        await createNewPost.save();
        res.status(201).json(createNewPost);
    } catch (err) {
        res.status(409).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {

    const { id } = req.params;
    try {
        const post = await Post.findById(id)
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    const { title, description, creator, fileUpload, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id) || !post ) 
        return res.status(404).send(`post ${id} not found`);

    const updatedPost = {
            creator,
            title,
            description,
            tags,
            fileUpload,
            _id: id,
    };
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);

}

export const deletePost = async (req, res) => {

    const  { id } = req.params;
    const post = await Post.findById(id);

    if(!mongoose.Types.ObjectId.isValid(id) || !post ) 
        return res.status(404).send(`post ${id} not found`);
    
    await Post.findByIdAndRemove(id);

    res.json({ message: "Successfully deleted" });

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    try {  const post = await Post.findById(id);
  
    const updatedBlogPost = await Post.findByIdAndUpdate(
      id,
      { upvote: post.upvote + 1 },
      { new: true }
    );
  
    res.json(updatedBlogPost);
    } catch (err) {
    res.status(404).json({ message: error.message });
    }
}


export default router;