<template>
  <div class="container-fluid px-3">
    <div class="row">
      <!-- Start Code-->
      <Getoffice
        :offices="offices"
        :error="error"
        :loading="loading"
      ></Getoffice>
      <!-- Start End-->
    </div>
  </div>
</template>
<script>
import Getoffice from "../components/offices/Getoffice.vue";

export default {
  components: {
    Getoffice,
  },
  computed: {
    offices() {
      return this.$store.getters.offices;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },

  methods: {
    loadOffices() {
      this.$store.dispatch("loadOffices");
    },
  },

  mounted() {
    this.loadOffices();
  },
};
</script>

<style lang="scss" scoped></style>
