<template>
  <div class="m-5">
    <div class="col-md-3 mb-2 mx-auto text-danger">
      <h2>Desk Details</h2>
    </div>
    <div v-if="loading" class="text-center mt-5 shadow">
      <Spinner />
    </div>
    <div class="row" v-if="desk">
      <img
        class="img-fluid col-md-6"
        :src="desk.map"
        :alt="'Image of ' + desk.map"
      />

      <div class="col-md-6 align-self-center">
        <div class="table-responsive-sm">
          <table class="table align-middle table-bordered border-dark">
            <tr class="text-dark">
              <td>Desk Label</td>
              <td>
                {{ desk.label }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>Office</td>
              <td>
                {{ desk.office.name }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>DeskId</td>
              <td>
                {{ desk.id }}
              </td>
            </tr>
            <tr>
              <td class="text-dark">Equipement</td>
              <td class="text-danger">
                <p v-for="e in desk.equipment" :key="e.id">- {{ e }}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <Alert v-if="error">{{ error.message }}</Alert>
  </div>
</template>

<script>
import Spinner from "../ui/Spinner.vue";
import Alert from "../ui/Alert.vue";

export default {
  name: "DesksDetails",
  components: { Spinner, Alert },
  props: ["id"],
  computed: {
    desk() {
      return this.$store.getters.desk;
    },
    loading() {
      return this.$store.getters.startLoadingDesk;
    },
    error() {
      return this.$store.getters.LoadingDeskError;
    },
  },

  methods: {
    loadesk() {
      this.$store.dispatch("loadDesk", this.id);
    },
  },

  mounted() {
    this.loadesk();
  },
};
</script>

<style lang="scss" scoped></style>
