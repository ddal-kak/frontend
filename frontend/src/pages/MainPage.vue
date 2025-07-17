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
          <img :src="prize.imageUrl" :alt="prize.name" class="prize-image" />
        </div>

        <!-- 카드 콘텐츠: 상세 정보 -->
        <div class="card-content">
          <div class="prize-details">
            <span>잔여 개수: <strong>{{ prize.remaining }}개</strong></span>
            <span>당첨 확률: <strong>{{ prize.probability }}%</strong></span>
          </div>
          <p class="prize-description">{{ prize.description }}</p>
        </div>

        <!-- 카드 푸터: 응모 버튼 -->
        <footer class="card-footer">
          <button class="apply-button" @click="applyForPrize(prize)">응모하기</button>
        </footer>
      </div>
    </div>

    <!-- 더보기 버튼 및 로딩 인디케이터 -->
    <div class="load-more-container">
      <button v-if="hasMore" @click="loadMore" :disabled="isLoading" class="load-more-button">
        {{ isLoading ? '로딩 중...' : '더보기' }}
      </button>
      <p v-if="!hasMore" class="no-more-prizes">더 이상 경품이 없습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      prizes: [],
      lastId: null, // 마지막으로 로드된 아이템의 ID
      itemsPerPage: 5,
      hasMore: true, // 더 불러올 데이터가 있는지 여부
      isLoading: false, // 데이터 로딩 중인지 여부
    };
  },
  methods: {
    // lastId를 기반으로 다음 페이지의 데이터를 가져오는 API 호출을 시뮬레이션합니다.
    async fetchPrizes(lastId = null) {
      this.isLoading = true;
      const newPrizes = [];
      const startId = lastId ? lastId + 1 : 1;

      for (let i = 0; i < this.itemsPerPage; i++) {
        const newId = startId + i;
        // 총 28개의 아이템만 있다고 가정
        if (newId > 28) {
          this.hasMore = false;
          break;
        }
        newPrizes.push({
          id: newId,
          name: `[특가] 프리미엄 경품 #${newId}`,
          imageUrl: `https://picsum.photos/600/600?random=${newId}`,
          remaining: Math.floor(Math.random() * 100) + 1,
          probability: (Math.random() * 15).toFixed(2),
          description: `이것은 경품 #${newId}에 대한 상세 설명입니다. 특별한 기회를 놓치지 마세요. 누구나 탐내는 한정판 아이템입니다.`,
        });
      }

      this.prizes.push(...newPrizes);
      if (this.prizes.length > 0) {
        this.lastId = this.prizes[this.prizes.length - 1].id;
      }
      
      this.isLoading = false;
    },
    applyForPrize(prize) {
      alert(`'${prize.name}'에 응모했습니다!`);
    },
    loadMore() {
      if (this.hasMore && !this.isLoading) {
        this.fetchPrizes(this.lastId);
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
  background-color: #fafafa;
}

.prize-feed {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.prize-card {
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #dbdbdb;
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
  background-color: #0095f6;
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
  background-color: #0095f6;
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
