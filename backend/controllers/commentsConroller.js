import jwt from 'jsonwebtoken'
import db from '../db.js'
export const getComments = (req, res) => {

  const token = req.cookies.token
  if (!token) return res.status(401).json({success: false,data: 'Please Log in to use more...'})
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(401).json({success: false,data: 'Token Is Expired'})

    let q = `SELECT c.*,u.userId as userId,firstName,lastName,picturePath FROM comments AS c JOIN users AS u ON (u.userId=c.userId) WHERE c.postId = ? ORDER BY c.createdAt `

    db.query(q, [req.query.postId] , (err, data) => {
      if (err) return res.status(500).json({success: false,err})
      return res.status(200).json({success: true,data: data})
    })
  })
}


export const addComment= async (req, res) => {
  
 
  const token=req.cookies.token;
    if(!token) return res.status(401).json({success:false,data:"Please Log in to use more..."})
    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(401).json({success:false,data:"Token Is Expired"})

        
        let q = "INSERT INTO comments (`desc`,`postId`,`userId`) VALUES (?,?,?)"
        const values=[req.body.desc,req.body.postId,userInfo.id]

        db.query(q, values , (err, data) => {
            if (err) return res.status(500).json({success: false,data:err})
            return res.status(200).json({success:true,data:"Comment has been Creaed."})  
        })

        


    })
}