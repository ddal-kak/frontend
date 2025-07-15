import axios from "axios";
import {useAuthStore} from "@/stores/auth";
import {router} from "@/router";

function apiInstance() {
    const instance = axios.create({
        baseURL: '/api',
        headers: {
            "Content-Type": 'application/json;charset=utf-8'
        },
    });
    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                const authStore = useAuthStore();
                authStore.logout();
                alert(error.response.data);
                router.push('/login');
            } else if (error.response && error.response.status === 403) {
                alert(error.response.data);
            }
            return Promise.reject(error);
        }
    );
    return instance;
}

export {apiInstance}