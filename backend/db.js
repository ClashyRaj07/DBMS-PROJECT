const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bharat0509',
  database: 'DBMS_PROJECT'
})

module.exports = db
