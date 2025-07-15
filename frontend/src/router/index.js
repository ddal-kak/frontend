import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import LoginPage from "@/pages/LoginPage.vue";

const routes = [
    { path: '/', component: MainPage},
    { path: '/signup', component: SignUpPage},
    { path: '/login', component: LoginPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})