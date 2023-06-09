import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { postReducer, postsReducer } from "./reducers/postsReducer";
import { profileReducer, userReducer } from "./reducers/usersReducer";
import { friendsReducer } from "./reducers/friendsReducers";
import { modeReducer } from "./reducers/modeReducer";

const reducer = combineReducers({
    posts: postsReducer,
    post: postReducer,
    user: userReducer,
    profile: profileReducer,
    friends: friendsReducer,
    mode: modeReducer,
});

function saveToLacalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem("store", serializedStore);
    } catch (err) {
        console.log(err);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem("store");
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLacalStorage(store.getState()));
export default store;
