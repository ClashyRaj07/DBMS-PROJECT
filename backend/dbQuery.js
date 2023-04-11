import db from './db.js'

const makeQuery = (q, res) => db.query(q, (err, data) => {
  if (err) return res.status(404).json({success: false,err})
  return res.status(200).json({success: true,data})
})

export default makeQuery
