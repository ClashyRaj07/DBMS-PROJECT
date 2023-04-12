export const friendsReducer = (
    state = { friendsList: [], friendRequests: [] },
    action
) => {
    switch (action.type) {
        case "SET_FRIENDS_REQUEST":
        case "FOLLOW_REQ_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "SET_FRIENDS_SUCCESS":
            return {
                ...state,
                loading: false,
                friendsList: action.payload,
            };
        case "FOLLOW_REQ_SUCCESS":
            return {
                ...state,
                loading: false,
                friendRequests: action.payload,
            };
        case "SET_FRIENDS_FAIL":
        case "FOLLOW_REQ_FAIL":
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
