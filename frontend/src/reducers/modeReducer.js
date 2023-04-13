export const modeReducer = (state = { mode: "dark" }, action) => {
    switch (action.type) {
        case "LIGHT_MODE":
            return {
                mode: "light",
            };
        case "DARK_MODE":
            return {
                mode: "dark",
            };
        default:
            return state;
    }
};
