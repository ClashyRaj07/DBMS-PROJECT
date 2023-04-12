import axios from "axios";

export const setFriends = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "SET_FRIENDS_REQUEST" });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `http://localhost:5000/relationships?followedUserId=${userId}`,
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
