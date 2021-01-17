import {combineReducers, createStore} from "redux";
import feedReducer from "./feed-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    feedPage: feedReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    authPage: authReducer
});

let store = createStore(reducers);

window.store = store;

export default store;
