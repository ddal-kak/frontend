import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MyPage from "@/pages/MyPage.vue";
import AdminPage from "@/pages/AdminPage.vue";

const routes = [
    { path: '/', component: MainPage},
    { path: '/signup', component: SignUpPage},
    { path: '/login', component: LoginPage},
    { path: '/my', component: MyPage},
    { path: '/admin', component: AdminPage}

]

export const router = createRouter({
    history: createWebHistory(),
    routes
})