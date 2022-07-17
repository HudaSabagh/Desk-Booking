<template>
  <div>
    <div class="office-preview col-md-6 mx-auto">
      <h2 class="my-4 text-danger text-center" v-if="office">
        {{ office.name }}
      </h2>
      <Alert v-if="error">{{ error.message }}</Alert>
      <div v-if="loading" class="text-center shadow">
        <Spinner />
      </div>
      <div class="row" v-if="office">
        <img
          class="img-fluid"
          :src="office.map"
          :alt="'Image of ' + office.map"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../ui/Spinner.vue";
import Alert from "../ui/Alert.vue";

export default {
  components: { Spinner, Alert },
  props: ["id"],
  name: "OfficeDetails.vue",
  computed: {
    office() {
      return this.$store.getters.office;
    },
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
  },

  methods: {
    loadOffice() {
      this.$store.dispatch("loadOffice", this.id);
    },
  },

  mounted() {
    this.loadOffice();
  },
};
</script>

<style lang="scss" scoped>
.office {
  background-color: $main-dark;
}
</style>
