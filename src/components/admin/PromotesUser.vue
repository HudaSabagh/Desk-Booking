<template>
  <div class="container-fluid px-3">
    <div class="row">
      <div v-if="loading" class="text-center">
        <Spinner />
      </div>
      <div class="mt-4">
        <div class="my-4">
          <h3 class="text-center text-danger">All Users</h3>
        </div>
        <table
          class="table table-dark table-striped border border-white mt-3 mb-3"
        >
          <thead>
            <tr>
              <th scope="col">Full Name:</th>
              <th>Email:</th>
              <th>Department:</th>
              <th>Status:</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageOfItems" :key="item.id">
              <td class="">{{ item.firstname }} {{ item.lastname }}</td>

              <td class="">
                {{ item.email }}
              </td>
              <td class="">
                {{ item.department }}
              </td>

              <td
                :class="[
                  { 'text-danger': item.isAdmin == true },
                  { 'text-success': item.isAdmin == false },
                ]"
              >
                <!-- if scusses here mean 204 then show scusses msg else msgerr -->
                <p>
                  {{ item.isAdmin == true ? "Admin" : "user" }}
                </p>
              </td>
              <td class=""></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer pb-0 bg-dark pt-3 text-center">
        <jw-pagination
          class="mb-3"
          :items="sortedArray"
          @changePage="onChangePage"
          :labels="customLabels"
          :styles="customStyles"
          :pageSize="pageSize"
        ></jw-pagination>
      </div>
    </div>
    <Alert v-if="error">{{ error.message }}</Alert>
  </div>
</template>

<script>
import _ from "lodash";
import Spinner from "../ui/Spinner.vue";
import Alert from "../ui/Alert.vue";
export default {
  data() {
    return {
      //begain dconfig paginate ..ready from net
      customLabels: {
        first: "<<",
        last: ">>",
        previous: "<",
        next: ">",
      },
      customStyles: {
        a: {
          backgroundColor: "#000000",
          cursor: "auto",
          color: "#fff",
        },
      },
      pageOfItems: [],
      pageSize: 15,
    };
  },
  components: { Spinner, Alert },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    error() {
      return this.$store.getters.errorUser;
    },
    loading() {
      return this.$store.getters.loadingUser;
    },
    sortedArray: function () {
      return _.orderBy(this.users, ["isAdmin"], ["desc"]);
    },
  },
  methods: {
    loadUsers() {
      this.$store.dispatch("loadUsers");
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },

  mounted() {
    this.loadUsers();
  },
};
</script>
<style lang="scss" scoped></style>
