import {defineStore} from "pinia";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        nickname: '',
        memberId: '',
        roles: []
    }),
    getters: {
        isLogin: state => !!state.nickname && !!state.memberId,
        isAdmin: state => state.roles.includes('ADMIN')
    },
    actions: {
        save(nickname, memberId, roles) {
            this.nickname = nickname;
            this.memberId = memberId;
            this.roles = roles;

        },
        logout() {
            this.nickname = '';
            this.memberId = '';
            this.roles = [];
        }
    },
    persist: {
        storage: sessionStorage,
    }
})