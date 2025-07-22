<template>
  <header class="header-container">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-between align-items-center py-3">
        <a @click="router().push('/')" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span class="logo-text">Ddal-kak</span>
        </a>
        <ul class="nav nav-pills">
          <!--로그인 아이콘-->
          <li v-if="authStore.isLogin" class="nav-item nav-link">
            {{authStore.nickname}}님 반갑습니다!
          </li>
          <li v-if="!authStore.isLogin" class="nav-item">
            <a @click="router().push('/login')" class="nav-link icon-link"><i class="bi bi-box-arrow-in-right"></i></a>
          </li>
          <!--로그아웃 아이콘-->
          <li @click="logout" v-if="authStore.isLogin" class="nav-item">
            <a class="nav-link icon-link"><i class="bi bi-box-arrow-right"></i></a>
          </li>
          <!--회원가입 아이콘-->
          <li v-if="!authStore.isLogin" class="nav-item">
            <a @click="router().push('/signup')" class="nav-link icon-link"><i class="bi bi-person-plus-fill"></i></a>
          </li>
          <!--마이페이지 아이콘-->
          <li v-if="authStore.isLogin" class="nav-item">
            <a @click="router().push('/my')" class="nav-link icon-link"><i class="bi bi-person-circle"></i></a>
          </li>
          <!--관리자페이지 아이콘-->
          <li v-if="authStore.isAdmin" class="nav-item">
            <a @click="router().push('/admin')" class="nav-link icon-link"><i class="bi bi-gear-fill"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import {router} from "@/router";
import {useAuthStore} from "@/stores/auth";

export default {
  name: "HeaderComponent",
  methods: {
    router() {
      return router
    },
    logout() {
      useAuthStore().logout();
      alert('로그아웃 완료');
    }
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  }
}
</script>

<style scoped>
.header-container {
  background: linear-gradient(to right, #83a4d4, #b6fbff);
  border-bottom: 1px solid #B3E0F2;
}

.logo-text {
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  color: #2c3e50;
  text-decoration: none;
}

.container {
  max-width: 700px;
}

.nav-item {
  margin-left: 10px;
}

.icon-link {
  font-size: 24px;
  color: #2c3e50;
  padding: 5px;
  transition: color 0.3s ease;
}

.icon-link:hover {
  color: #000000;
}
</style>