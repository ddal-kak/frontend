<template>
  <div class="container">
    <div class="d-flex align-items-center py-4 first">
      <main class="form-signin w-100 m-auto">
        <h1 class="h3 mb-3 fw-normal">로그인</h1>

        <div class="form-floating">
          <input v-model="loginDto.email" type="email" class="form-control" id="floatingInput"
                 placeholder="name@example.com">
          <label for="floatingInput">이메일</label>
        </div>
        <div class="form-floating">
          <input v-model="loginDto.password" type="password" class="form-control" id="floatingPassword"
                 placeholder="Password">
          <label for="floatingPassword">비밀번호</label>
        </div>
        <button class="btn btn-dark w-100 py-2" @click="signInRequest">로그인</button>
      </main>
    </div>
  </div>
</template>

<script>
import {apiInstance} from "@/api";
import {useAuthStore} from "@/stores/auth";

const axiosInstance = apiInstance();

export default {
  name: "LoginPage",
  data() {
    return {
      loginDto: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    signInRequest() {
      axiosInstance.post('/login', this.loginDto)
          .then(response => {
            if (response.status === 200) {
              alert("로그인 완료");
              const nickname = response.data.name;
              const memberId = response.data.memberId;
              const roles = response.data.roles;
              useAuthStore().save(nickname, memberId, roles);
              this.$router.push('/')
            }
          })
          .catch(error => {
            if (error.response && !error.response.status === 401) {
              alert("로그인 중 오류가 발생했습니다.")
            }
          });
    },
  }
}
</script>

<style scoped>
/* Global Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Form Styles */
.form-signin {
  max-width: 400px;
  padding: 15px;
  margin: auto;
}

.form-floating {
  margin-bottom: 1rem;
}

/* Dropdown Styles */
.dropdown-menu {
  min-width: 8rem;
}

.dropdown-item {
  cursor: pointer;
}

/* Optional: Style for active item */
.dropdown-item.active {
  background-color: #e9ecef;
}

/* Optional: Style for dropdown toggle */
.dropdown-toggle {
  outline: none; /* Remove default focus style */
}

/* Optional: Style for form checkbox */
.form-check-input {
  margin-top: 0.3rem;
}

/* Optional: Style for 'Remember me' label */
.form-check-label {
  margin-bottom: 0;
}
</style>