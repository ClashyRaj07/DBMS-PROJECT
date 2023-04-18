import express from "express";
import {
    createPost,
    deletePost,
    getUserPosts,
    timelinePosts,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/create", createPost);
router.get("/", timelinePosts);
router.get("/:userId", getUserPosts);
router.delete("/", deletePost);

export default router;
