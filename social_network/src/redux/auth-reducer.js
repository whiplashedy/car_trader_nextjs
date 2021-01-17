import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessage: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state;
    }
}
export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
});
export const setErrorMessage = (error) => ({type: SET_ERROR_MESSAGE, error})

export const setAuthThunk = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }

}
export const loginThunk = (email, password) => async (dispatch) => {

    const response = await authAPI.login(email, password);

    if (response.data.resultCode === 0) {
        dispatch(setAuthThunk());
    }
}
export const logoutThunk = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}
export default authReducer;
