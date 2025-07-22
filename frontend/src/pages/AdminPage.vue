<template>
  <div class="container mt-5">
    <h2>관리자 페이지 - 새 상품 등록</h2>

    <div class="card mb-4">
      <div class="card-header">
        상품 정보 입력
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <!-- 상품명 -->
          <div class="mb-3">
            <label for="prizeName" class="form-label">상품명</label>
            <input type="text" class="form-control" id="prizeName" v-model="prize.name" required>
          </div>

          <!-- 가격 -->
          <div class="mb-3">
            <label for="prizePrice" class="form-label">가격</label>
            <input type="number" class="form-control" id="prizePrice" v-model.number="prize.price" min="0" required>
          </div>

          <!-- 수량 -->
          <div class="mb-3">
            <label for="prizeQuantity" class="form-label">수량</label>
            <input type="number" class="form-control" id="prizeQuantity" v-model.number="prize.quantity" min="0" required>
          </div>

          <!-- 당첨 확률 범위 -->
          <div class="mb-3">
            <label for="prizeProbability" class="form-label">당첨 확률 범위</label>
            <input type="number" class="form-control" id="prizeProbability" v-model.number="prize.probabilityRange" min="1" required>
            <div class="form-text">높은 값일수록 당첨 확률이 낮아집니다. (1 ~ 9223372036854775807)</div>
          </div>

          <!-- 설명 -->
          <div class="mb-3">
            <label for="prizeDescription" class="form-label">설명</label>
            <textarea class="form-control" id="prizeDescription" v-model="prize.description" rows="3"></textarea>
          </div>

          <!-- 이미지 파일 -->
          <div class="mb-3">
            <label for="prizeImage" class="form-label">상품 이미지</label>
            <input type="file" class="form-control" id="prizeImage" @change="handleFileChange" accept="image/*">
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">등록하기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { router } from '@/router';
import { apiInstance } from '@/api/index.js';
import axios from 'axios'; // axios for direct PUT to presigned URL

export default {
  name: 'AdminPage',
  setup() {
    const authStore = useAuthStore();
    const api = apiInstance();

    const prize = ref({
      name: '',
      quantity: 0,
      price: 0,
      probabilityRange: 1,
      imageUrl: '', // Change to empty string
      description: ''
    });

    const selectedFile = ref(null); // New ref for selected file

    const handleFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const addPrize = (data) => {
      return api.post('/prizes', data);
    };

    onMounted(() => {
      if (!authStore.isAdmin) {
        alert('관리자만 접근 가능합니다.');
        router.push('/');
      }
    });

    const handleSubmit = async () => {
      try {
        if (selectedFile.value) {
          // 1. Get presigned URL
          const fileName = selectedFile.value.name;
          const presignResponse = await api.get(`/presign?fileName=${fileName}`);
          const presignedUrl = presignResponse.data.url;
          // const imageUrl = presignResponse.data.imageUrl; // This is the absolute path to be saved in DB

          // Parse the absolute path from presignedUrl

          const absoluteImagePath = new URL(presignedUrl).pathname;

          // 2. Assign parsed absolute path to prize.imageUrl
          prize.value.imageUrl = absoluteImagePath;


          // 3. Upload image to presigned URL
          await axios.put(presignedUrl, selectedFile.value, {
            headers: {
              // 에러 가능
              'Content-Type': selectedFile.value.type,
            },
          });
          alert('이미지 업로드 성공!');
        } else {
          // If no file selected, set imageUrl to a default or handle as needed
          prize.value.imageUrl = 'default.url'; // Or handle error/warning
        }

        // 4. Register product information
        await addPrize(prize.value);
        alert('상품이 성공적으로 등록되었습니다.');
        resetForm();
      } catch (error) {
        console.error('상품 등록 중 오류 발생:', error);
        const errorMessage = error.response?.data?.message || '오류가 발생했습니다. 콘솔을 확인해주세요.';
        alert(errorMessage);
      }
    };

    const resetForm = () => {
      prize.value = {
        name: '',
        quantity: 0,
        price: 0,
        probabilityRange: 1,
        imageUrl: '', // Reset imageUrl
        description: ''
      };
      selectedFile.value = null; // Reset selected file
    };

    return {
      prize,
      handleSubmit,
      handleFileChange // Expose handleFileChange
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 760px;
}
</style>
