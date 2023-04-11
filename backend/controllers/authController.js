import bcrypt from 'bcrypt'
import db from '../db.js'
import sendToken from '../utils/jwtToken.js'
import cloudinary from 'cloudinary'

// Register User
export const register = async (req, res) => {



  const {firstName, lastName, occupation, location, picturePath, email, password} = req.body
    
  if(picturePath.length>0)
  {
    const data=await cloudinary.v2.uploader.upload(picturePath[0],{folder:'TwikTik'})
    req.body.public_url=data.public_id
    req.body.picturePath=data.secure_url

  }

  let q = 'SELECT * FROM users WHERE email = ?'
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json({success: false,data: err})
    if (data.length) return res.status(409).json({success: false,data: 'User Already Exist'})
  })

  // Create new User
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  q = 'INSERT INTO users (`firstName`,`lastName`,`location`,`occupation`,`email`,`password`,`picturePath`,`public_url`) VALUES (?,?,?,?,?,?,?,?)'

  const values = [firstName, lastName, location, occupation, email, hashedPassword, req.body.picturePath,req.body.public_url]

  db.query(q, values , (err, data) => {
    if (err) return res.status(500).json({success: false,data: err})

    return res.status(200).json(
      {
        success: true,
        data: 'User has been Created.'
      }
    )
  })
  
}

export const login = (req, res) => {
  const {email, password} = req.body

  const q = 'SELECT * FROM users WHERE email=?'

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json({success: false,err})
    else {
      if (data.length) {
        const check = bcrypt.compareSync(password, data[0].password)
        if (!check) {
          return res.status(404).json({success: false,message: 'Please Enter Valid Credentials'})
        }

        return sendToken(data, 200, res)
      }
      return res.status(404).json({success: false,message: 'User  Not Found'})
    }
  })
}

export const logout = (req, res) => {
  res.cookie('token', null, {expires: new Date(Date.now()),httpOnly: true,secure: true})
  res.status(200).json({
    success: true,
    data: 'Logged Out Succesfully'
  })
}
