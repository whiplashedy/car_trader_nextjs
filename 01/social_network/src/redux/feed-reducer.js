const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

let initialState = {
    posts: ["post1", "post2", "post3", "post3"],
    newPostText: ""
};

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let post = state.newPostText;
            return {
                ...state,
                posts: [...state.posts, post],
                newPostText: ''

            };
        }
        case UPDATE_POST_TEXT: {
            return{
                ...state,
                newPostText: action.post
            };
        }
        default:
            return state;
    }
}
export const actionCreatorAddPost = () => ({type: ADD_POST});
export const actionCreatorUpdatePostText = (text) => ({
    type: UPDATE_POST_TEXT,
    post: text
});
export default feedReducer;
