const express = require('express')
const makeQuery = require('../dbQuery.js')
const db = require('../db.js')
const router = express.Router()
const cloudinary=require('cloudinary')

// Create new Post
router.post('/create', async (req, res) => {

  const {description, post_img=null, userId} = req.body

  if(post_img)
  {
    const data=await cloudinary.v2.uploader.upload(post_img,{folder:'TwikTik'})
    console.log("VClodianey data",data);
  }

  const q = `INSERT INTO blogpost (description ,post_img,userId) VALUES ('${description}','${post_img}',${userId})`

  makeQuery(q, res)
})

// Get all posts
router.get('/all', (req, res) => {

  const q = 'SELECT * FROM blogpost NATURAL JOIN user'

  makeQuery(q, res)
})

// Get Post by postId
router.get('/post/:postId', (req, res) => {
  const {postId} = req.params

  const q = `SELECT * FROM blogpost WHERE postId=${postId}`

  makeQuery(q, res)
})

// Get Posts of User
router.get('/user/:id', (req, res) => {
  const userId = req.params.id

  const q = `SELECT * FROM blogpost WHERE userId=${userId}`

  makeQuery(q, res)
})

// Update Post Details
router.put('/:id', (req, res) => {
  const postId = req.params.id
  const {title, description, post_img} = req.body
  if (title) {
    const q = `UPDATE blogpost SET title='${title}' WHERE postId='${postId}'`

    db.query(q, (err, data) => {
      if (err) return res.status(500).json({success: false,message: err})
    })
  }
  if (description) {
    const q = `UPDATE blogpost SET description='${description}' WHERE postId='${postId}'`

    db.query(q, (err, data) => {
      if (err) return res.status(500).json({success: false,message: err})
    })
  }
  if (post_img) {
    const q = `UPDATE blogpost SET post_img='${post_img}' WHERE postId='${postId}'`

    makeQuery(q, res)
  }
})

// Delete post by postId

router.delete('/:postId', (req, res) => {
  const postId = req.params.postId

  const q = `DELETE FROM blogpost WHERE postId='${postId}'`

  makeQuery(q, res)
})

module.exports = router
