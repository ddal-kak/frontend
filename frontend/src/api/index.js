import axios from "axios";
// import {useAuthStore} from "@/stores/auth";
// import {router} from "@/router";

function apiInstance() {
    const instance = axios.create({
        baseURL: '/api',
        headers: {
            "Content-Type": 'application/json;charset=utf-8'
        },
    });
    return instance;
}

export {apiInstance}