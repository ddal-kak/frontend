import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        nickname: '',
        memberId: '',
    }),
    getters: {
        isLogin: state => !!state.nickname && !!state.memberId
    },
    actions: {
        save(nickname, memberId) {
            this.nickname = nickname;
            this.memberId = memberId;
        },
        logout() {
            this.nickname = '';
            this.memberId = '';
        }
    },
    persist: {
        storage: sessionStorage,
    }
})