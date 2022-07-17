<template>
  <div class="container-fluid px-3">
    <div class="row">
      <!-- Start Code-->
      <GetDesks :desks="desks" :error="error" :loading="loading"></GetDesks>
      <!-- Start End-->
    </div>
  </div>
</template>
<script>
import GetDesks from "../components/desks/GetDesks.vue";

export default {
  components: {
    GetDesks,
  },


  computed: {
    desks() {
      return this.$store.getters.desks;
    },
    error() {
      return this.$store.getters.errorDES;
    },
    loading() {
      return this.$store.getters.loadingDES;
    },
  },
  methods: {
    loadDesks() {
      this.$store.dispatch("loadDesks");
    },
  },

  mounted() {
    this.loadDesks();
  },


};
</script>

<style lang="scss" scoped></style>
