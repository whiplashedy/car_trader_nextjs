import {applyMiddleware, combineReducers, createStore} from "redux";
import feedReducer from "./feed-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk"
import appReducer from "./app-reducer";

let reducers = combineReducers({
    feedPage: feedReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    appPage: appReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
