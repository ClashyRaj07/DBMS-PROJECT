const express = require('express')
const makeQuery = require('../dbQuery.js')
const db = require('../db.js')
const router = express.Router()

// Like a post 
router.post('/like', (req, res) => {

  const {liked_by, liked_postId} = req.body

  const q = `INSERT INTO likes (liked_by ,liked_postId) VALUES (${liked_by},${liked_postId})`

  makeQuery(q, res)
})

// Get Likes of Post by postId
router.get('/post/:id', (req, res) => {
  const postId = req.params.id

  q = `SELECT liked_by FROM likes WHERE liked_postId=${postId}`
  db.query(q, (err, data) => {
    if (err) return res.status(404).json({success: false,err})

    let likes = []
    data.map(el => likes.push(el.liked_by))
    likes = [...new Set(likes)]
    data = likes
    res.status(200).json({success: true,likes: likes})
  })
})

// Dislike a post
router.delete('/:likeId', (req, res) => {
  const likeId = req.params.likeId

  const q = `DELETE FROM likes WHERE liked_by='${likeId}'`

  makeQuery(q, res)
})

module.exports = router
