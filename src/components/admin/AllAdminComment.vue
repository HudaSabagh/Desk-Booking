<template>
  <div class="container-fluid px-3">
    <div class="row">
      <div v-if="loading" class="text-center">
        <Spinner />
      </div>
      <div class="mt-4">
        <div class="my-4">
          <h3 class="text-center text-danger">All Comments</h3>
        </div>
        <table
          class="table table-dark table-striped border border-white mt-3 mb-3"
        >
          <thead>
            <tr>
              <th scope="col">Commented At:</th>
              <th>Content</th>
              <th>Office:</th>
              <th>Desk:</th>
              <th>Commented By:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageOfItems" :key="item.id">
              <td class="">
                {{ item.commentedAt.substr(0, 10) }}
              </td>
              <td class="">
                {{ item.comment }}
              </td>
              <td class="">
                {{ item.desk.office.name }}
              </td>
              <td class="">
                {{ item.desk.label }}
              </td>
              <td class="">
                {{ item.user.firstname }} {{ item.user.lastname }}
              </td>
              <td class=""></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer pb-0 bg-dark pt-3 text-center">
        <jw-pagination
          class="mb-3"
          :items="adcomments"
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
      pageSize: 12,
    };
  },
  components: { Spinner, Alert },
  computed: {
    adcomments() {
      return this.$store.getters.adcomments;
    },
    error() {
      return this.$store.getters.errorUser;
    },
    loading() {
      return this.$store.getters.loadingUser;
    },
    sortedArray: function () {
      return _.orderBy(this.adcomments, ["commentedAt"], ["desc"]);
    },
  },
  methods: {
    allComments() {
      this.$store.dispatch("allComments");
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
  mounted() {
    this.allComments();
  },
};
</script>
<style lang="scss" scoped></style>
