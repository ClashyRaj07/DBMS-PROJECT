const express = require('express')

const app = express()
const PORT = 5000
app.use(express.json())

const cors = require('cors')

const authRoute = require('./routes/authRoute.js')
const userRoute = require('./routes/userRoute.js')
const blogPostRoute = require('./routes/blogPostRoute.js')
const commentsRoute = require('./routes/commentsRoute.js')
const likedPostRoute = require('./routes/likedPostRoute.js')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')

app.use(cors())
app.use(bodyParser({extended: true}))

cloudinary.config({
  cloud_name: 'dbhf7xh4q',
  api_key: '887173712287675',
  api_secret: 'T8bjOinQ4NWc7mphFRuVA9PDifY'
})

app.use('/auth', authRoute)

app.use('/users', userRoute)

app.use('/posts', blogPostRoute)

app.use('/comments', commentsRoute)

app.use('/likes', likedPostRoute)

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`)
})
