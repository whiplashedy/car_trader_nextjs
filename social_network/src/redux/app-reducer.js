import {setAuthThunk} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED'

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
export const setInitializedSuccess = () => ({type: SET_INITIALIZED});

export const setInitializedThunk = () => (dispatch) => {
    const promise = dispatch(setAuthThunk());
    Promise.all([promise]).then((r)=>{
        dispatch(setInitializedSuccess());
    })

}

export default appReducer;
