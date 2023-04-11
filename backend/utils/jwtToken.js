
import jwt from 'jsonwebtoken'

const sendToken = (data, statusCode, res) => {

  const token = jwt.sign({id: data[0].userId}, 'secretKey')
  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true
  }
  const {password,...user}=data[0];
  return res.cookie('token', token, options).status(statusCode).json({
    success: true,
  user})
}

export default sendToken
