import axios from "axios";

export const postsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_POSTS_REQUEST":
            return {
                loading: true,
            };
        case "GET_ALL_POSTS_SUCCESS":
            return {
                loading: false,
                posts: [...new Set(action.payload)],
            };
        case "GET_ALL_POSTS_FAIL":
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const postReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case "NEW_POSTS_REQUEST":
        case "LIKE_POST_REQUEST":
            return {
                loading: true,
            };
        case "NEW_POSTS_SUCCESS":
            return {
                loading: false,
                isCreated: action.payload,
            };
        case "LIKE_POST_SUCCESS":
            return {
                loading: false,
                isLiked: action.payload,
            };
        case "NEW_POSTS_FAIL":
        case "LIKE_POST_FAIL":
            return {
                loading: false,
                isCreated: false,
                error: action.payload,
            };
        case "LIKE_POST_FAIL":
            return {
                loading: false,
                isLiked: false,
                error: action.payload,
            };
        case "CLEAR_ERRORS":
            return {
                loading: false,
                isCreated: null,
                isLiked: null,
                error: null,
            };
        default:
            return state;
    }
};
