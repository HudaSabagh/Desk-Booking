<template>
  <div class="container">
    <div class="col-lg-12 my-5 mx-auto">
      <div class="main card section mb-5">
        <div class="card-body">
          <h2 class="text-white">Favourites</h2>
          <h6 class="text-white mb-5">
            Select your favourites desks in this section for a faster and
            simpler way to book!
          </h6>
          <div class="row pt-3 mb-5">
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
                  >Favourite Desk</label
                >
                <select
                  v-model="Selctdesk"
                  class="form-select"
                  @change="resetsubit()"
                >
                  <option selected>Choose Fav Desk</option>
                  <option
                    :class="[{ 'text-danger': favourite.fixDeskUserId }]"
                    v-bind:value="{ deskid: favourite.id, index: index }"
                    v-for="(favourite, index) in Favourites"
                    :key="favourite.id"
                  >
                    {{ favourite.label }} in Office
                    {{ favourite.office.name }}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                      favourite.fixDeskUserId ? "Not available" : "Available"
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
                @click="
                  addbooking();
                  resetsubit();
                "
              >
                <i class="fa fa-check text-white fa-1x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SwitchAlert
        class="mt-3"
        :showcondition="resp_code_delete"
        :success="resp_code_delete == 204"
        :err="resp_code_delete == 403"
        :msgsucc="'Your Booking has been deleted'"
        :msgerr="'Something went wrong! Please try again later.'"
      />
      <SwitchAlert
        class="mt-3"
        :showcondition="resp_code_add"
        :success="resp_code_add == 204"
        :err="resp_code_add !== 204"
        :msgsucc="'Successfully Booked'"
        :msgerr="'We are sorry but this desk is already booked!'"
      />
      <table
        class="table table-dark table-striped border border-white mt-2 mb-3"
      >
        <thead>
          <tr class="bar">
            <th scope="col">Platz</th>
            <th>Stiege</th>
            <th>Equipment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="favourite in Favourites" v-bind:key="favourite.id">
            <td>{{ favourite.label }}</td>
            <td>{{ favourite.office.name }}</td>
            <td>{{ favourite.equipment[0] }} - {{ favourite.equipment[1] }}</td>
            <td class="text-end">
              <button
                class="btn btn-danger px-3 ms-2 border-0 mt-1"
                @click="deleteFav(favourite.id)"
              >
                <i class="fa fa-trash text-white"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="card-footer pb-0 bg-dark pt-3 text-center">
        <jw-pagination
          class="mb-3"
          :items="Favourites"
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
import { sharedUserFavourites } from "../services/favourite-service";
import SwitchAlert from "../components/ui/SwitchAlert.vue";
import moment from "moment";
import { sharedBookService } from "@/services/bookings-service";
export default {
  components: {
    SwitchAlert,
  },
  data() {
    return {
      resp_code_delete: "",
      resp_code_add: "",
      Today: moment().format("yyyy-MM-DD"),
      startdate: moment().format("yyyy-MM-DD"),
      dateend: moment().format("yyyy-MM-DD"),

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
      pageSize: 13,
      Selctdesk: "",
    };
  },
  computed: {
    Favourites() {
      return this.$store.getters.Favourites;
    },
    loading() {
      return this.$store.getters.loadingFavourite;
    },
    error() {
      return this.$store.getters.errorFavourite;
    },

    afterthreeday() {
      return moment(this.startdate).add(2, "days").format("yyyy-MM-DD");
    },
    Getdesk() {
      if (this.Selctdesk.index >= 0) {
        return this.Favourites[this.Selctdesk.index];
      } else {
        return null;
      }
    },
  },
  methods: {
    loadFavourites() {
      this.$store.dispatch("loadFavourites");
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
          this.loadFavourites();
        });
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    resetsubit() {
      this.resp_code_delete = "";
      this.resp_code_add = "";
    },
    deleteFav(id) {
      sharedUserFavourites
        .deleteFavourite(id)
        .then((response) => {
          if (response.status) {
            this.resp_code_delete = response.status;
            this.loadFavourites();
          }
        })
        .catch((error) => {
          this.resp_code_delete = error.status;
        })
        .finally(() => {
          this.resp_code_add = "";
        });
    },
  },
  mounted() {
    this.loadFavourites();
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
.section {
  background-color: #2c3034;
}
</style>
