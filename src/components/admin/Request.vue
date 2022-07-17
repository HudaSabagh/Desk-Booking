<template>
  <div class="container-fluid px-3 mt-5">
    <div class="my-4">
      <h3 class="text-center text-danger">All requests</h3>
      <div class="row">
        <!-- <div v-if="loading" class="text-center">
          <Spinner />
        </div> -->
        <SwitchAlert
          class="mt-3"
          :showcondition="code"
          :success="code == 204"
          :err="code !== 204"
          :msgsucc="'The request has been successfully accepted'"
          :msgerr="'Error'"
        />
        <SwitchAlert
          class="mt-3"
          :showcondition="code_del"
          :success="code_del == 204"
          :err="code_del !== 204"
          :msgsucc="'The request was successfully rejected'"
          :msgerr="'Error'"
        />
      </div>
      <div class="mt-4">
        <table
          class="table table-dark table-striped border border-white mt-5 mb-3"
        >
          <thead>
            <tr>
              <th scope="col">requested At:</th>
              <th>Comment:</th>
              <th>Office</th>
              <th>Desk</th>
              <th>By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageOfItems" :key="item.id">
              <td class="">
                {{ item.requestedAt.substr(0, 10) }}
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
              <td class="">{{ item.user.firstname }}</td>
              <td class="">
                <button
                  class="btn btn-warning btn-sm border-0"
                  @click="
                    openModel();
                    setIdReq(item.id);
                    loadRequest();
                  "
                >
                  <i class="fa fa-eye text-white"></i>
                </button>
                <button
                  class="btn btn-success btn-sm border-0 ms-1"
                  @click="
                    setIdReq(item.id);
                    approve();
                  "
                >
                  <i class="fa fa-check text-white"></i>
                </button>
                <button
                  class="btn btn-danger btn-sm border-0 ms-1"
                  v-if="show"
                  @click="
                    setIdReq(item.id);
                    decline();
                  "
                >
                  <span class="text-white">X</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer pb-0 bg-dark pt-3 text-center">
        <jw-pagination
          class="mb-3"
          :items="requests"
          @changePage="onChangePage"
          :labels="customLabels"
          :styles="customStyles"
          :pageSize="pageSize"
        ></jw-pagination
        ><!-- sort array instead of booking because it is sorted -->
      </div>
    </div>
    <div v-if="myModel && request">
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
                      By: {{ request.user.firstname }}
                      {{ request.user.lastname }}
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
                  <h3>{{ request.comment }}</h3>
                  <h6>{{ request.desk.office.name }}</h6>
                  <br />
                  <small>
                    Commeted At: {{ request.requestedAt.substr(0, 10) }}</small
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
/* import GetBookings from "../components/booking/GetBookings.vue"; */
import { sharedAdminService } from "@/services/admin-service";
import SwitchAlert from "@/components/ui/SwitchAlert.vue";
/* import Spinner from "../ui/Spinner.vue"; */
import Alert from "../ui/Alert.vue";

export default {
  data() {
    return {
      /* this for modal */
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
      pageSize: 5,
      Selctdesk: "",
      ID: "",
      code: "",
      show: true,
      code_del: "",
    };
  },
  components: {
    SwitchAlert,
  /*   Spinner, */
    Alert,
  },
  computed: {
    requests() {
      return this.$store.getters.requests;
    },
    request() {
      return this.$store.getters.request;
    },
    error() {
      return this.$store.getters.errorReq;
    },
    loading() {
      return this.$store.getters.loadingReq;
    },
  },

  methods: {
    loadRequests() {
      this.$store.dispatch("loadRequests");
    },
    loadRequest() {
      this.$store.dispatch("loadReq", this.setIdReq(this.ID));
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    openModel() {
      this.myModel = true;
      this.code_del = "";
      this.code = "";
    },
    setIdReq(id) {
      return (this.ID = id);
    },
    approve() {
      sharedAdminService
        .accept(this.setIdReq(this.ID))
        .then((response) => {
          if (response.status) {
            this.code = response.status;
            this.loadRequests(); /* to refresh requests page */
          }
        })
        .catch((error) => {
          this.code = error.status;
        });
    },
    decline() {
      sharedAdminService
        .decline(this.setIdReq(this.ID))
        .then((response) => {
          if (response.status) {
            this.code_del = response.status;
            this.loadRequests();
          }
        })
        .catch((error) => {
          this.code_del = error.status;
        });
    },
  },
  mounted() {
    this.loadRequests();
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  position: absolute;
  left: 40%;
  top: -20px;
  border-radius: 50%;
}
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
