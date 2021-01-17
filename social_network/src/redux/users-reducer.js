import {profileAPI, usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    profile: null,
    status: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true};
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false};
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsers}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_USER_STATUS:
            return {...state, status: action.status}
        default:
            return state;
    }
}

export const follow = (userID) => ({type: FOLLOW, userID});
export const unfollow = (userID) => ({type: UNFOLLOW, userID});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsers) => ({type: SET_TOTAL_USERS_COUNT, totalUsers});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserProfileStatus = (status) => ({type: SET_USER_STATUS, status})

export const setUsersThunk = (currentPage, pageSize) => (dispatch) => {
    dispatch(setIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    });
}
export const unfollowThunk = (uid) => (dispatch) => {
    usersAPI.unfollowApi(uid).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollow(uid));
        }
    }).catch(e => {
        console.log(e);
    })
}
export const followThunk = (uid) => async (dispatch) => {
    try {
        const data = await usersAPI.followApi(uid);
        if (data.resultCode === 0) {
            dispatch(follow(uid));
        }
    } catch (e) {
        console.log(e);
    }

}
export const setUsersProfileThunk = (uid) => async (dispatch) => {
    dispatch(setIsFetching(true));
    const data = await usersAPI.getProfile(uid);
    dispatch(setIsFetching(false));
    dispatch(setUserProfile(data));

}
export const setUserStatusThunk = (uid) => async (dispatch) => {
    const response = await profileAPI.getStatus(uid)
    dispatch(setUserProfileStatus(response.data));

}
export const updateUserStatusThunk = (status) => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setUserProfileStatus(status));
        }
    } catch (e) {
        console.log(e);
    }
}

export default usersReducer;
