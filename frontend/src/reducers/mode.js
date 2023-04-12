export const modeReducer =
    () =>
    (state = {}, action) => {
        switch (action.type) {
            case "DARK_MODE":
                return {
                    mode: "dark",
                };

            case "LIGHT_MODE":
                return {
                    mode: "light",
                };

            default:
                return state;
        }
    };
