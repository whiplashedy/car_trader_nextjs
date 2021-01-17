import axios from "axios";

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "d15d7348-4ece-473f-8a37-b695d617fccb"
        }
    }
);

export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    getProfile(uid) {
        return profileAPI.getProfile(uid);
    },
    async unfollowApi(uid) {
        const response = await instance.delete(`follow/${uid}`);
        return response.data;

    },
    async followApi(uid) {
        const response = await instance.post(`follow/${uid}`);
        return response.data;
    }
}
export const profileAPI = {
    async getProfile(uid) {
        const response = await instance.get(`profile/${uid}`);
        return response.data;

    },
    getStatus(uid) {
        return instance.get(`profile/status/${uid}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password) {
        return instance.post(`auth/login`, {email, password});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}
