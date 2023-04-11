import express from 'express'
import { createPost, timelinePosts } from '../controllers/postController.js'
const router = express.Router()

router.post('/create', createPost)
router.get('/', timelinePosts)

export default router
