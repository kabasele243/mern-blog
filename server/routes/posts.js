import express from "express";
import { getAllPosts, addPost, getPost, deletePost, likePost, updatePost } from '../controller/posts.js';


const router = express.Router();

router.get( "/", getAllPosts);
router.post("/", addPost)
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.patch('/:id/likePost', likePost);
router.patch("/:id", updatePost);

export default router;