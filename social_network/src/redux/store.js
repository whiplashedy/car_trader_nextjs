import feedReducer from "./feed-reducer";
import dialogReducer from "./dialog-reducer";

let store = {
    _state: {
        feedPage:{
            posts: ["post1", "post2", "post3", "post3"],
            newPostText: ""
        },
        dialogPage: {
            newDialogText: "",
            dialogsData: [
                {id: 0, name: "Ayana"},
                {id: 1, name: "Nurs"},
                {id: 2, name: "Mura"},
                {id: 3, name: "Erj"}
            ],
            messages: [
                {id: 0, archive: ["ayanaq"]
                },
                {id: 1, archive: ["nursq"]
                },
                {id: 2, archive: ["muraq"]
                },
                {id: 3, archive: ["erjq"]
                },
            ]
        },
        sidebar: {}
    },
    _rerenderTree() {
        console.log("state changed");
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderTree = observer;
    },
    dispatch(action) { // action - object {type: ''}
        this._state.feedPage = feedReducer(this._state.feedPage, action);
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._rerenderTree(this._state);
    }
}

export default store;
window.store = store;
