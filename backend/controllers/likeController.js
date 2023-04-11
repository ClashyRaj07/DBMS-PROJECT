import db from '../db.js'
import jwt from 'jsonwebtoken'
export const getLikes = (req, res) => {

  let q = 'SELECT liked_by FROM likes WHERE liked_postId=?'

  db.query(q, [req.query.postId] , (err, data) => {
    if (err) return res.status(500).json({success: false,data: err})
    return res.status(200).json({success: true,data: data.map(like => like.liked_by)})
  })
}


export const addLike= async (req, res) => {
  
 
  const token=req.cookies.token;
    if(!token) return res.status(401).json({success:false,data:"Please Log in to use more..."})
    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(401).json({success:false,data:"Token Is Expired"})

        
        let q = "INSERT INTO likes (`liked_postId`,`liked_by`) VALUES (?,?)"
        const values=[req.body.postId,userInfo.id]

        db.query(q, values , (err, data) => {
            if (err) return res.status(500).json({success: false,data:err})
            return res.status(200).json({success:true,data:"Post has been Liked."})  
        })

        


    })
}

export const deleteLike= async (req, res) => {
  
 
  const token=req.cookies.token;
    if(!token) return res.status(401).json({success:false,data:"Please Log in to use more..."})
    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(401).json({success:false,data:"Token Is Expired"})

        
        let q = "DELETE FROM likes WHERE `liked_postId`= ? AND `liked_by`=?"
        const values=[req.query.postId,userInfo.id]

        db.query(q, values , (err, data) => {
            if (err) return res.status(500).json({success: false,data:err})
            return res.status(200).json({success:true,data:"Post has been Disliked."})  
        })

        


    })
}