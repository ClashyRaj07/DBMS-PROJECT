import axios from "axios";
import { baseURL } from "../Axios";

export const getAllPosts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "GET_ALL_POSTS_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.get(`${baseURL}/posts`, options);

        dispatch({ type: "GET_ALL_POSTS_SUCCESS", payload: data.data });
    } catch (error) {
        console.log("post errro", error);
        dispatch({
            type: "GET_ALL_POSTS_FAIL",
            payload: error.response.data.message,
        });
    }
};

export const newPost = (postData) => async (dispatch) => {
    try {
        dispatch({ type: "NEW_POSTS_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `${baseURL}/posts/create`,
            postData,
            options
        );

        dispatch({ type: "NEW_POSTS_SUCCESS", payload: data.success });
    } catch (error) {
        dispatch({
            type: "NEW_POSTS_FAIL",
            payload: error?.response?.data?.message,
        });
    }
};

export const likePost = (liked_by, liked_postId) => async (dispatch) => {
    try {
        dispatch({ type: "LIKE_POSTS_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
            `${baseURL}/likes/like`,
            { liked_by, liked_postId },
            options
        );

        dispatch({ type: "LIKE_POSTS_SUCCESS", payload: data.success });
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: "LIKE_POSTS_FAIL",
            payload: error.response.data.message,
        });
    }
};
