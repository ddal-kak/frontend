<template>
  <div class="main-container">
    <div class="prize-feed">
      <div v-for="prize in prizes" :key="prize.id" class="prize-card">
        <!-- 카드 헤더: 상품명 -->
        <header class="card-header">
          <h2 class="prize-name">{{ prize.name }}</h2>
        </header>

        <!-- 카드 이미지 -->
        <div class="card-image-wrapper">
          <img :src="prize.imageUrl" :alt="prize.name" class="prize-image"/>
        </div>

        <!-- 카드 콘텐츠: 상세 정보 -->
        <div class="card-content">
          <div class="prize-details">
            <span>잔여 개수: <strong>{{ prize.quantity }}개</strong></span>
            <span>당첨 확률: <strong>{{
                prize.probabilityRange ? (100 / prize.probabilityRange).toFixed(2) : '0.00'
              }}%</strong></span>
          </div>
          <p class="prize-description">{{ prize.description }}</p>
        </div>

        <!-- 카드 푸터: 응모 버튼 -->
        <footer class="card-footer">
          <button class="apply-button" @click="applyPrize(prize.id)">응모하기</button>
        </footer>
      </div>
    </div>

    <!-- 더보기 버튼 및 로딩 인디케이터 -->
    <div class="load-more-container">
      <button v-if="hasNext" @click="loadMore" :disabled="isLoading" class="load-more-button">
        {{ isLoading ? '로딩 중...' : '더보기' }}
      </button>
      <p v-if="!hasNext" class="no-more-prizes">더 이상 경품이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import {apiInstance} from "@/api";

const axios = apiInstance();

export default {
  name: 'MainPage',
  data() {
    return {
      prizes: [],
      lastId: null, // 마지막으로 로드된 아이템의 ID
      hasNext: true, // 더 불러올 데이터가 있는지 여부
      isLoading: false, // 데이터 로딩 중인지 여부
    };
  },
  methods: {
    // lastId를 기반으로 다음 페이지의 데이터를 가져오는 API 호출을 시뮬레이션합니다.
    async fetchPrizes(size = 5, lastId) {
      this.isLoading = true;
      axios.get(`/prizes`, {
        params: {
          size,
          lastId
        }
      }).then(res => {
        this.prizes.push(...res.data.data);
        this.hasNext = res.data.hasNext;
        if (this.prizes.length > 0) {
          this.lastId = this.prizes[this.prizes.length - 1].id;
        }
      }).catch(error => {
        console.error("error occur", error)
      }).finally(() => {
        this.isLoading = false;
      });
    },
    applyPrize(prizeId) {
      axios.get(`/draws/prizes/${prizeId}`)
          .then(() => {
            alert("응모 완료! 잠시 후 마이페이지에서 결과를 확인해보세요.")
          })
          .catch(error => {
            console.error("error occur", error)
          })
    },
    loadMore() {
      if (this.hasNext && !this.isLoading) {
        this.fetchPrizes(5, this.lastId);
      }
    },
  },
  created() {
    // 컴포넌트가 생성될 때 첫 페이지 데이터를 불러옵니다.
    this.fetchPrizes();
  },
};
</script>

<style scoped>
.main-container {
  max-width: 640px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.prize-feed {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.prize-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1rem;
}

.prize-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.card-image-wrapper {
  width: 100%;
  height: auto;
}

.prize-image {
  width: 100%;
  height: 100%;
  display: block;
}

.card-content {
  padding: 1rem;
  text-align: left;
}

.prize-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
}

.prize-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
  margin: 0;
}

.card-footer {
  padding: 0 1rem 1rem;
}

.apply-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.apply-button:hover {
  background-color: #007ac1;
}

.load-more-container {
  text-align: center;
  padding: 2rem 0;
}

.load-more-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.load-more-button:disabled {
  background-color: #b2dffc;
  cursor: not-allowed;
}

.no-more-prizes {
  color: #8e8e8e;
  font-size: 1rem;
}
</style>
