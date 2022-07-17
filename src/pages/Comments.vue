<template>
  <div class="container-fluid px-3">
    <div class="row">
      <div v-if="loading" class="text-center">
        <Spinner />
      </div>
      <div class="mx-auto m-5">
        <h3 class="text-center text-danger">
          Please select a Desk to see his comments
        </h3>
      </div>
      <div class="col-md-5 mt-5">
        <div class="input-group">
          <label class="text-white bg-dark border-2 input-group-text"
            >Desk</label
          >
          <select
            v-model="Selctdesk"
            class="form-select"
            @change="loadComments()"
          >
            <option
              :class="[{ 'text-danger': desk.fixDeskUserId }]"
              v-bind:value="{ deskid: desk.id, index: index }"
              v-for="(desk, index) in desks"
              :key="desk.id"
            >
              {{ desk.label }} in Office
              {{ desk.office.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                desk.fixDeskUserId ? "Not available" : "Available"
              }}
            </option>
          </select>
          <button
            class="text-white bg-dark border-2 input-group-text"
            v-if="loading"
          >
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
        </div>
      </div>
      <div class="mt-4">
        <table
          class="table table-dark table-striped border border-white mt-3 mb-3"
        >
          <thead>
            <tr>
              <th scope="col">Commented At:</th>
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
                {{ item.desk.office.name }}
              </td>
              <td class="">
                {{ item.desk.label }}
              </td>
              <td class="">{{ item.user.firstname }}</td>
              <td class="">
                <button
                  class="btn btn-warning btn-sm border-0"
                  @click="
                    openModel();
                    setIdComment(item.id);
                    loadComment();
                  "
                >
                  <i class="fa fa-eye text-white"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer pb-0 bg-dark pt-3 text-center">
        <jw-pagination
          class="mb-3"
          :items="comments"
          @changePage="onChangePage"
          :labels="customLabels"
          :styles="customStyles"
          :pageSize="pageSize"
        ></jw-pagination
        ><!-- sort array instead of booking because it is sorted -->
      </div>
    </div>
    <!-- Modal  -->
    <div v-if="myModel && comment">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header d-flex flex-start">
                  <img
                    class="rounded-circle shadow-1-strong me-3"
                    src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="avatar"
                    width="40"
                    height="40"
                  />
                  <div class="w-100">
                    <h5>
                      By: {{ comment.user.firstname }}
                      {{ comment.user.lastname }}
                    </h5>
                  </div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="myModel = false"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h3>{{ comment.comment }}</h3>
                  <br />
                  <small>
                    Commeted At: {{ comment.commentedAt.substr(0, 10) }}</small
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <Alert v-if="error">{{ error.message }}</Alert>
  </div>
</template>
<script>
import _ from "lodash";
import Spinner from "../components/ui/Spinner.vue";
import Alert from "../components/ui/Alert.vue";
export default {
  data() {
    return {
     myModel: false,
      actionButton: "Insert",
      dynamicTitle: "Add Data",
      Array2: [],
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
      pageSize: 3,
      Selctdesk: "",
      ID: "",
    };
  },
  components: { Spinner, Alert },
  computed: {
    desks() {
      return this.$store.getters.desks;
    },
    loading() {
      return this.$store.getters.loadingDES;
    },
    error() {
      return this.$store.getters.errorDES;
    },

    Getdesk() {
      if (this.Selctdesk.index >= 0) {
        return this.desks[this.Selctdesk.index];
      } else {
        return null;
      }
    },
    comments() {
      return this.$store.getters.comments;
    },
    comment() {
      return this.$store.getters.comment;
    },
    sortedArray: function () {
      return _.orderBy(this.comments, ["commentedAt"], ["desc"]);
    },
  },

  methods: {
    loadDesks() {
      this.$store.dispatch("loadDesks");
    },
    loadComments() {
      if (this.Getdesk) {
        this.$store.dispatch("loadComments", this.Getdesk.id);
      }
    },
    loadComment() {
      this.Array2 = [this.Getdesk.id, this.setIdComment(this.ID)];
      /*      console.log(this.Array2); */
      this.$store.dispatch("loadComment", this.Array2);
      this.loadComments();
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    openModel() {
      this.myModel = true;
    },
    setIdComment(id) {
      return (this.ID = id);
    },
  },
  mounted() {
    this.loadDesks();
  },
};
</script>
<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
