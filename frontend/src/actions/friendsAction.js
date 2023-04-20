import Axios from "../Axios";

export const setFriends = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "SET_FRIENDS_REQUEST" });

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await Axios.get(
            `/relationships?followedUserId=${userId}`,
            { config }
        );

        dispatch({ type: "SET_FRIENDS_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({
            type: "SET_FRIENDS_FAIL",
            payload: error?.response?.data?.message,
        });
    }
};

export const unfollowUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "UNFOLLOW_USER_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await Axios.delete(
            `/relationships?followedUserId=${userId}`,
            options
        );

        dispatch({ type: "UNFOLLOW_USER_SUCCESS", payload: data.success });
    } catch (error) {
        dispatch({
            type: "UNFOLLOW_USER_FAIL",
            payload: error?.response?.data?.message,
        });
    }
};

export const followUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "FOLLOW_USER_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await Axios.post(
            `/relationships`,
            { userId },
            options
        );

        dispatch({ type: "FOLLOW_USER_SUCCESS", payload: data.success });
    } catch (error) {
        dispatch({
            type: "FOLLOW_USER_FAIL",
            payload: error?.response?.data?.message,
        });
    }
};
