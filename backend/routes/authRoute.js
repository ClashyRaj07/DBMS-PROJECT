const express = require('express')
const db = require('../db.js')
const makeQuery = require('../dbQuery.js')
const router = express.Router()

router.post('/register', (req, res) => {
  const {username, email, password} = req.body

  const q = `insert into user (username,email,password) values ('${username}','${email}','${password}')`

  makeQuery(q, res)
})

router.get('/get', (req, res) => {
  const q = 'SELECT * FROM user'

  makeQuery(q, res)
})

// Login User
router.post('/login', (req, res) => {
  const {email, password} = req.body

  const q = `SELECT * FROM user WHERE email='${email}' and password='${password}'`

  db.query(q, (err, data) => {
    if (err) return res.status(404).json({success: false,err})
    else {
      if (data.length) {
        return res.status(200).json({success: true,data})
      }
      return res.status(404).json({success: false,message: 'Please Enter Valid Credentials'})
    }
  })
})

// Change User Password

// Login User
router.post('/password/change/:id', (req, res) => {
  const userId = req.params.id
  const {password} = req.body

  const q = `UPDATE user SET password=${password} WHERE id='${userId}'`

  db.query(q, (err, data) => {
    if (err) return res.status(404).json({success: false,err})
    else {
      if (data.length) {
        return res.status(200).json({success: true,data})
      }
      return res.status(403).json({success: false,message: 'Unauthorized!! Access Denied'})
    }
  })
})
module.exports = router
