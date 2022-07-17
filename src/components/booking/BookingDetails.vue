<template>
  <div class="m-5">
    <div class="col-md-3 mb-5 mx-auto text-danger">
      <h2>Booking Details</h2>
    </div>
    <div v-if="loading" class="text-center mt-5 shadow">
      <Spinner />
    </div>
    <div class="row" v-if="booking">
      <img
        class="img-fluid col-md-6 mb-3"
        :src="booking.desk.map"
        :alt="'Image of ' + booking.desk.map"
      />
      <div class="col-md-6 align-self-center">
        <div class="table-responsive-sm">
          <table class="table align-middle table-bordered border-dark">
            <tr class="text-dark">
              <td>Booked At:</td>
              <td>
                {{ booking.bookedAt.substr(0, 10) }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>User Name :</td>
              <td>
                {{ booking.user.firstname }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>User Department :</td>
              <td>
                {{ booking.user.department }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>Start Date :</td>
              <td>
                {{ booking.dateStart }}
              </td>
            </tr>

            <tr class="text-dark">
              <td>End Date:</td>
              <td>
                {{ booking.dateEnd }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>Office Name:</td>
              <td>
                {{ booking.desk.office.name }}
              </td>
            </tr>
            <tr class="text-dark">
              <td>Desk Nummer</td>
              <td>
                {{ booking.desk.label }}
              </td>
            </tr>
            <tr>
              <td class="text-dark">Equipement</td>
              <td class="text-danger">
                <p v-for="e in booking.desk.equipment" :key="e.id">- {{ e }}</p>
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
import Spinner from "../ui/SwitchAlert.vue";
import Alert from "../ui/Alert.vue";

export default {
  components: { Spinner, Alert },
  props: ["id"],
  computed: {
    booking() {
      return this.$store.getters.booking;
    },
    loading() {
      return this.$store.getters.loadingBook;
    },
    error() {
      return this.$store.getters.errorBook;
    },
  },
  methods: {
    loadBooking() {
      this.$store.dispatch("loadBooking", this.id);
    },
  },
  mounted() {
    this.loadBooking();
  },
};
</script>

<style lang="scss" scoped></style>
