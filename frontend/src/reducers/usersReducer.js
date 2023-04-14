export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "FIND_USER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "FIND_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case "FIND_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                isUpdated: false,
                error: null,
            };
        default:
            return state;
    }
};

export const profileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "GET_USER_REQUEST":
        case "UPDATE_USER_REQUEST":
        case "NEW_USER_REQUEST":
        case "FOLLOW_USER_REQUEST":
        case "UNFOLLOW_USER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case "UPDATE_USER_SUCCESS":
        case "FOLLOW_USER_SUCCESS":
        case "UNFOLLOW_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case "NEW_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
            };
        case "GET_USER_FAIL":
        case "NEW_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "UPDATE_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
                isUpdated: false,
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                isUpdated: false,
                error: null,
            };
        case "LOGOUT":
            return {
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};
