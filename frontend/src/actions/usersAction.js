import axios from "axios";
import Axios from "../Axios";

export const setMode = (newMode) => async (dispatch) => {
    if (newMode === "dark") {
        dispatch({ type: "DARK_MODE" });
    } else {
        dispatch({ type: "LIGHT_MODE" });
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "NEW_USER_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await Axios.post("/auth/register", userData, options);

        dispatch({ type: "NEW_USER_SUCCESS", payload: data.success });
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: "NEW_USER_FAIL",
            payload: error.response.data.message,
        });
    }
};
export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "GET_USER_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await Axios.post("/auth/login", userData, options);

        dispatch({ type: "GET_USER_SUCCESS", payload: data.user });
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: "GET_USER_FAIL",
            payload: error.response.data.message,
        });
    }
};
export const logout = () => async (dispatch) => {
    dispatch({ type: "LOGOUT" });
};

export const getUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "GET_USER_REQUEST" });

        const options = {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        };
        const { data } = await Axios.get(`/users`, options);

        dispatch({ type: "GET_USER_SUCCESS", payload: data.data[0] });
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: "GET_USER_FAIL",
            payload: error.response.data.message,
        });
    }
};

export const updateUser = (formData, userId) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_USER_REQUEST" });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await Axios.put(`/users`, formData, { config });

        dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.success });
    } catch (error) {
        dispatch({
            type: "UPDATE_USER_FAIL",
            payload: error?.response?.data?.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ERRORS" });
};
