import axios from "axios";

export const getAllPosts=()=>async (dispatch)=>{
    try {
         dispatch({type:"GET_ALL_POSTS_REQUEST"})

        const options={
            headers: { "Content-Type": "application/json" }
        }
        const {data}= await axios.get('http://localhost:5000/posts/all');
        console.log("post data -->",data);
        dispatch({type:"GET_ALL_POSTS_SUCCESS",payload:data.data})

        
        
    } catch (error) {

        console.log("post errro",error);
        dispatch({type:"GET_ALL_POSTS_FAIL",payload:error.response.data.message})
    }      
}

export const newPost=(postData)=>async (dispatch)=>{
     try {
        dispatch({type:'NEW_POSTS_REQUEST'})

        const config = { headers: {
    'Content-Type': 'application/json',
    
  }}
        const {data}=await axios.post(`http://localhost:5000/posts/create`,postData,{config})

        dispatch({type:'NEW_POSTS_SUCCESS',payload:data.success})
        
    } catch (error) {
        
        dispatch({type:'NEW_POSTS_FAIL',payload:error?.response?.data?.message})   
    }    
}

export const likePost=(liked_by,liked_postId)=>async (dispatch)=>{
    try {
         dispatch({type:"LIKE_POSTS_REQUEST"})

        const options={
            headers: { "Content-Type": "application/json" }
        }
        const {data}= await axios.post(`http://localhost:5000/likes/like`,{liked_by,liked_postId},options);
    
        dispatch({type:"LIKE_POSTS_SUCCESS",payload:data.success})

        
        
    } catch (error) {

        console.log(error.response);
        dispatch({type:"LIKE_POSTS_FAIL",payload:error.response.data.message})
    }      
}
