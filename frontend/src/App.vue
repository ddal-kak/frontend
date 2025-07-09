<template>
  <HeaderComponent></HeaderComponent>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from "@/components/common/HeaderComponent.vue";
import FooterComponent from "@/components/common/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
#app {
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid #B3E0F2; /* 메인 테두리선 색상 */
}
</style>
