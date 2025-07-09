<template>
  <footer class="footer-container">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-between align-items-center py-3">
        <p class="col-md-4 mb-0 text-muted">&copy; 2025 DDALKAK, Inc</p>
        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a class="text-muted" href="#">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
.footer-container {
  background-color: #E0F2F7; /* 연한 하늘색 */
  border-top: 1px solid #B3E0F2;
}

.container {
  max-width: 700px;
}
</style>