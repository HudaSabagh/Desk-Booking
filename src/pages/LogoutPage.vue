<template>
  <div class="container-fluid px-3 bg-dark">
    <div class="row align-items-center justify-content-center vh-100">
      <h1 class="text-center text-white">Thank you! See you soon!</h1>
    </div>
  </div>
</template>

<script>
import { sharedAuthService } from "../services/auth-service";

export default {
  mounted() {
    setTimeout(() => {
      sharedAuthService
        .logout()
        .then(() => this.$router.push({ name: "login" }));
    }, 1000);
  },
};
</script>
