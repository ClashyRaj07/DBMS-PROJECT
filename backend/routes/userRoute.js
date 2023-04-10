const express = require('express')
const makeQuery = require('../dbQuery.js')
const router = express.Router()

// Get User Details
router.get('/:id', (req, res) => {
  const userId = req.params.id
  const q = `SELECT * FROM user WHERE userId=${userId}`

  makeQuery(q, res)
})

// Update User Details
router.put('/:id', (req, res) => {
  const userId = req.params.id
  const {firstName, lastName, location, occupation, picturePath} = req.body

  if (userId) {
    const q = `UPDATE user SET firstName='${firstName}',lastName='${lastName}',location='${location}',occupation='${occupation}',picturePath='${picturePath}' WHERE userId='${userId}'`
    makeQuery(q, res)
  }else {
    return res.status(200).json({
      success: false,
      message: 'Please Enter valid userName.'
    })
  }
})

// Delete User Account/Details
router.delete('/:id', (req, res) => {
  const userId = req.params.id

  const q = `DELETE FROM user WHERE userId='${userId}'`
  makeQuery(q, res)
})

module.exports = router
