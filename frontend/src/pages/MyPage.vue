<template>
  <div class="container mt-5 mb-5">
    <!-- 기본 회원 정보 -->
    <div class="card mb-4">
      <div class="card-header">
        기본 회원 정보
      </div>
      <div class="card-body">
        <div class="mb-3 row">
          <label for="staticName" class="col-sm-2 col-form-label">이름</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="staticName" :value="userInfo.name">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-2 col-form-label">이메일</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="userInfo.email">
          </div>
        </div>
      </div>
    </div>

    <!-- 현재 보유 응모권 -->
    <div class="card mb-4">
      <div class="card-header">
        보유 응모권
      </div>
      <div class="card-body">
        <p class="card-text">현재 보유하고 있는 응모권은 총 <strong>{{ ticketCount }}</strong>개 입니다. (데일리 로그인 시 1개 리워드)</p>
      </div>
    </div>

    <!-- 당첨 내역 -->
    <div class="card">
      <div class="card-header">
        당첨 내역
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush" v-if="winnings.length > 0">
          <li v-for="winning in winnings" :key="winning.id" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span class="fw-bold">{{ winning.prizeName }}</span>
              <span class="badge ms-2" :class="getResultBadgeClass(winning.result)">{{ winning.result }}</span>
            </div>
            <span class="badge bg-secondary rounded-pill">{{ winning.dateTime }}</span>
          </li>
        </ul>
        <p v-else class="card-text">아직 당첨 내역이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiInstance } from "@/api";
import { useAuthStore} from "@/stores/auth";

const axios = apiInstance();

export default {
  name: "MyPage",
  data() {
    return {
      userInfo: {
        name: '',
        email: ''
      },
      ticketCount: 0,
      winnings: []
    }
  },
  created() {
    this.fetchMyPageData(useAuthStore().memberId);
  },
  methods: {
    getResultBadgeClass(result) {
      if (result === 'WIN') return 'bg-success';
      if (result === 'LOSE') return 'bg-danger';
      return 'bg-secondary';
    },
    fetchMyPageData(memberId) {
      // 기본 회원 정보 조회
      axios.get(`/members/${memberId}`)
          .then(response => {
            this.userInfo = response.data;
          })
          .catch(error => {
            console.error("회원 정보 조회 실패:", error);
          });

      // 보유 응모권 개수 조회
      axios.get(`/tickets/members/${memberId}`)
          .then(response => {
            this.ticketCount = response.data.quantity;
          })
          .catch(error => {
            console.error("응모권 개수 조회 실패:", error);
          });

      // 당첨 내역 조회
      axios.get(`/draws/members/${memberId}`)
          .then(response => {
            this.winnings = response.data;
          })
          .catch(error => {
            console.error("당첨 내역 조회 실패:", error);
          });
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
.card-header {
  font-weight: bold;
}
</style>
