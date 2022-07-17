<template>
  <div class="container-fluid px-3">
    <div class="row my-3 border bg-dark shadow">
      <div v-if="statusComment">
        <div class="input-group mt-3">
          <label class="text-white bg-dark border-2 input-group-text"
            >Comment</label
          ><!-- v-model: this is tow way data binding to update the html view and their related javascript proprites and v-model mean that html view update auto when data model changed -->
          <textarea
            v-model="comment"
            class="form-control"
            style="resize: none"
          ></textarea>
          <button class="btn btn-success" @click="addComment()">
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
        <!-- v-bind:class or :class="" this mean one way data binding to update classes styles from javascript probrites and in this v-bind html view will not update when data model change   -->
        <SwitchAlert
          class="mt-3"
          :showcondition="code"
          :success="code == 204"
          :err="code !== 204"
          :msgsucc="'Your Comment has been sended'"
          :msgerr="'Error'"
        />
      </div>
      <div class="row pt-3 mb-5" v-if="!statusComment">
        <div class="col-md-3">
          <div class="input-group">
            <label class="text-white bg-dark border-2 input-group-text"
              >Start</label
            >
            <input
              class="form-control"
              type="date"
              v-model="startdate"
              :min="Today"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="input-group">
            <label class="text-white bg-dark border-2 input-group-text"
              >End</label
            >
            <input
              class="form-control"
              type="date"
              v-model="dateend"
              :min="startdate"
              :max="afterthreeday"
            />
          </div>
        </div>
        <div class="col-md-5">
          <div class="input-group">
            <label class="text-white bg-dark border-2 input-group-text"
              >Desk</label
            >
            <select
              v-model="Selctdesk"
              class="form-select"
              @change="resetsubit()"
            >
              <option selected>Choose Desk</option>
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
        <div class="col-md-1" v-if="Getdesk">
          <button
            v-if="!Getdesk.fixDeskUserId && resp_code_add == ''"
            class="btn btn-dark border-2 border-white bg-success shadow"
            @click="addbooking()"
          >
            <i class="fa fa-check text-white fa-1x"></i>
          </button>
        </div>
      </div>

      <Alert class="mt-3" variant="success" v-if="resp_code_delete == 204"
        ><p class="text-center">Booking Deleted</p>
      </Alert>
      <Alert class="mt-3" variant="danger" v-if="resp_code_delete == 403"
        ><p class="text-center">
          The requesting user is not allowed to cancel / delete this flex desk
          booking.
        </p>
      </Alert>
      <Alert
        class="mt-3 text-center"
        variant="info "
        v-if="resp_code_add == 204"
      >
        Booking Success
      </Alert>
      <Alert class="mt-3" variant="danger" v-if="resp_code_add == 409"
        ><p class="text-center">Booking Error</p>
      </Alert>
      <div
        class="spinner-border text-danger mx-auto"
        role="status"
        v-if="LoadingBook"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <table
        class="table table-dark table-striped border border-white mt-3 mb-3"
        v-if="!LoadingBook"
      >
        <thead>
          <tr>
            <th scope="col">Booked At</th>
            <th>Start</th>
            <th>End</th>
            <th>Office</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageOfItems" :key="item.id">
            <td class="">
              {{ item.bookedAt.substr(0, 10) }}
            </td>
            <td class="">
              {{ item.dateStart }}
            </td>
            <td class="">
              {{ item.dateEnd }}
            </td>
            <td class="">
              {{ item.desk.office.name }}
            </td>

            <td class="text-end">
              <router-link
                :to="{ name: 'booking-details', params: { id: item.id } }"
                class="btn btn-warning btn-sm border-0"
              >
                <i class="fa fa-eye text-white"></i>
              </router-link>
              <button
                class="btn btn-danger btn-sm ms-2 border-0"
                v-if="
                  moment(item.dateStart).isAfter(moment().format('yyyy-MM-DD'))
                "
                @click="deletebooking(item.id)"
              >
                <i class="fa fa-trash text-white"></i>
              </button>
              <!-- we can statusComment just between start date befor today and end date after today -->
              <button
                v-if="
                  !moment(item.dateStart).isBefore(
                    moment().format('yyyy-MM-DD')
                  ) &&
                  !moment(item.dateStart).isAfter(moment().format('yyyy-MM-DD'))
                "
                @click="
                  statusComment = !statusComment;
                  preparationIDDESk(item.desk.id);
                "
                class="btn btn-success btn-sm ms-2"
              >
                <i class="fa fa-comment text-white"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>
<script>
import moment from "moment";
import { sharedBookService } from "@/services/bookings-service";
import { sharedDeskService } from "../services/desk-service";
import Alert from "../components/ui/Alert.vue";
import SwitchAlert from "../components/ui/SwitchAlert.vue";
import _ from "lodash";
export default {
  components: {
    Alert,
    SwitchAlert,
  },
  data() {
    return {
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
      pageSize: 8,

      statusComment: false,
      Selctdesk: "", //v-model select option
      Today: moment().format("yyyy-MM-DD"),
      startdate: moment().format("yyyy-MM-DD"),
      dateend: moment().format("yyyy-MM-DD"),
      resp_code_add: "", // to know response for Add Function ,
      resp_code_delete: "", //to know response for delete */,
      DeskIDforComment: "", //to have the id for comment
      comment: "",
      code: "",
    };
  },
  computed: {//to handle compleex logic and opration like geeters
    afterthreeday() {
      return moment(this.startdate).add(2, "days").format("yyyy-MM-DD");
    },
    desks() {
      return this.$store.getters.desks;
    },
    error() {
      return this.$store.getters.errorDES;
    },
    loading() {
      return this.$store.getters.loadingDES;
    },
    bookings() {
      return this.$store.getters.Bookings;
    },
    LoadingBook() {
      return this.$store.getters.loadingBook;
    },
    errorBook() {
      return this.$store.getters.errorBook;
    },
    // to get desk id when you select desk
    Getdesk() {
      if (this.Selctdesk.index >= 0) {
        return this.desks[this.Selctdesk.index];
      } else {
        return null;
      }
    },
    sortedArray: function () {
      return _.orderBy(this.bookings, ["bookedAt"], ["desc"]);
    },
  },
  methods: {
    loadDesks() {
      this.$store.dispatch("loadDesks");
    },
    loadbookings() {
      this.$store.dispatch("loadbookings");
    },
    addbooking() {
      sharedBookService
        .Booking(this.Getdesk.id, this.startdate, this.dateend)
        .then((response) => {
          if (response.status) {
            this.resp_code_add = response.status;
          }
        })
        .catch((error) => {
          this.resp_code_add = error.response.status;
        })
        .finally(() => {
          this.loadbookings();
          this.resp_code_delete = "";
        }); //will be executed in any case while handling errors using try and catch block
    },
    deletebooking(id) {
      sharedBookService
        .deleteBooking(id)
        .then((response) => {
          if (response.status) {
            this.resp_code_delete = response.status;
            this.loadbookings();
          }
        })
        .catch((error) => {
          this.resp_code_delete = error.response.status;
        })
        .finally(() => {
          this.resp_code_add = "";
          this.code = "";
        });
    },
    /* add new comment for the desk for the booking has started */
    addComment() {
      sharedDeskService
        .addCommentFlex(this.DeskIDforComment, this.comment)
        .then((response) => {
          if (response.status) {
            this.code = response.status;
            console.log(this.code);
          }
        })
        .catch((error) => {
          this.code = error.response.status; //when error exist give me number of error
        })
        .finally((this.comment = ""));
    },
    /* to change the content of table*/
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    /* to hide the alert msg */
    resetsubit() {
      this.resp_code_delete = "";
      this.resp_code_add = "";
    },
    /* here we have the value of desk id out side v-for loop ::from button comment when we add prameter to method */
    preparationIDDESk(id) {
      this.DeskIDforComment = id;
      this.resp_code_add = "";
      this.resp_code_delete = "";
      this.code = "";
    },
  },
  //If you need to to show the server data immediately after the component is loaded, you should put action inside mounted lifecycle method.
  mounted() {
    this.loadDesks();
    this.loadbookings();
  },
  watch: {
    startdate: function (val) {
      this.resp_code_add = "";
      this.resp_code_delete = "";
      return (this.dateend = val);
    },
  },
};
</script>

<style lang="scss" scoped>
.dataTables_paginate {
  margin-top: 15px;
  position: absolute;
  text-align: right;
  left: 50%;
}
</style>
