import axios from 'axios'

export const loginUser=(userData)=>async (dispatch)=>{
    try {
         dispatch({type:"GET_USER_REQUEST"})

        const options={
            headers: { "Content-Type": "application/json" }
        }
        const {data}= await axios.post("http://localhost:5000/auth/login",userData,options);
    
        dispatch({type:"GET_USER_SUCCESS",payload:data.data[0]})

        
        
    } catch (error) {

        console.log(error.response);
        dispatch({type:"GET_USER_FAIL",payload:error.response.data.message})
    }
    
       
}
export const logout=()=>async(dispatch)=>{
    dispatch({type:"LOGOUT"})
}


export const getUser=(userId)=>async (dispatch)=>{
    try {
         dispatch({type:"GET_USER_REQUEST"})

        const options={
            headers: { "Content-Type": "application/json" }
        }
        const {data}= await axios.get(`http://localhost:5000/auth/${userId}`);
    
        dispatch({type:"GET_USER_SUCCESS",payload:data.data[0]})

        
        
    } catch (error) {

        console.log(error.response);
        dispatch({type:"GET_USER_FAIL",payload:error.response.data.message})
    }      
}


export const updateUser=(formData,userId)=>async (dispatch)=>{
     try {
        dispatch({type:'UPDATE_USER_REQUEST'})

        const config = { headers: {
    'Content-Type': 'application/json',
    
  }}
        const {data}=await axios.put(`http://localhost:5000/users/${userId}`,formData,{config})

        dispatch({type:'UPDATE_USER_SUCCESS',payload:data.success})
        
    } catch (error) {
        
        dispatch({type:'UPDATE_USER_FAIL',payload:error?.response?.data?.message})   
    }      
}

export const clearErrors=()=>async (dispatch)=>{
 dispatch({type:'CLEAR_ERRORS'})   
}


