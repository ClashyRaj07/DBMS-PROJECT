import express from "express";
import {
    createPost,
    getUserPosts,
    timelinePosts,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/create", createPost);
router.get("/", timelinePosts);
router.get("/:userId", getUserPosts);

export default router;
