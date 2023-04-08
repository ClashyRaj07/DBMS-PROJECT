const express = require("express")
const makeQuery = require("../dbQuery.js")
const router = express.Router()

// Create new Post
router.post("/create",(req,res)=>{

    const {comment,commentingUserId,postId} = req.body

    const q = `INSERT INTO comments (comment ,postId,commentingUserId) VALUES ('${comment}','${postId}',${commentingUserId})`

    makeQuery(q,res);
})

// Get all comments of user by userId
router.get("/user/:id",(req,res)=>{
    
    const userId = req.params.id

    const q = `SELECT * FROM comments WHERE commentingUserId=${userId}`

    makeQuery(q,res);
})


// Get Comment of Post by postId
router.get("/post/:id",(req,res)=>{
    const postId = req.params.id

    const q = `SELECT * FROM comments WHERE postId=${postId}`

    makeQuery(q,res);
})

//Update Comment 
router.put('/:id',(req,res)=>{
    const commentId=req.params.id;
    const {comment}=req.body;
    if(comment){
        const q=`UPDATE comments SET comment='${comment}' WHERE commentId='${commentId}'`;
        
        makeQuery(q,res);
    }  
})

// Delete comment by commentId

router.delete("/:commentId",(req,res)=>{
    const commentId = req.params.commentId

    const q = `DELETE FROM comments WHERE commentId='${commentId}'`
    
    makeQuery(q,res);
})

module.exports = router