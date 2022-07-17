<template>
  <div class="container-fluid px-3">
    <div class="row align-items-center justify-content-center vh-100">
      <div v-if="loading" class="text-center">
        <Spinner />
      </div>
      <div class="row mt-5">
        <SwitchAlert
          :showcondition="code"
          :success="code == 204"
          :err="code !== 204"
          :msgsucc="'Your request has been sent'"
          :msgerr="'Already Booked'"
        />
        <SwitchAlert
          :showcondition="code_delete"
          :success="code_delete == 204"
          :err="code_delete !== 204"
          :msgsucc="'Your request has been deleted'"
          :msgerr="'Error'"
        />
      </div>
      <div class="row bg-dark pt-5">
        <div class="col-md-3">
          <div class="input-group">
            <span
              class="input-group-text bg-dark text-white"
              id="inputGroup-sizing-default"
              >Start</span
            >
            <input
              @change="resetsubit()"
              class="form-control"
              type="date"
              v-model="startdate"
              :min="Today"
            />
          </div>
        </div>
        <div class="col-md-5">
          <div class="input-group">
            <span
              class="input-group-text bg-dark text-white"
              id="inputGroup-sizing-default"
              >Desk</span
            >
            <select
              @change="
                resetsubit();
                loadStatusFix();
              "
              v-model="selectDesk"
              class="form-select"
              aria-label="Default select example"
            >
              <option
                :value="{ deskid: desk.id, index: index }"
                v-for="(desk, index) in desks"
                :key="desk.id"
                :class="{ 'text-danger': desk.fixDeskUserId }"
              >
                {{ index + 1 }}-{{ desk.label }} in Office
                {{ desk.office.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                {{ desk.fixDeskUserId ? "Fix Desk" : "Available" }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-4 text-white">
          <div class="input-group">
            <span
              :class="[
                {
                  ' text-success': getonlystatuts == 'Approved',
                },
                {
                  'text-warning': getonlystatuts == 'Pending',
                },
                {
                  'text-danger': getonlystatuts == 'NonExisting',
                },
                { 'text-white': getonlystatuts == '' },
              ]"
              class="input-group-text bg-dark"
              id="inputGroup-sizing-default"
              >Comment Status :</span
            >
            <input
              :class="[
                {
                  ' border-success': getonlystatuts == 'Approved',
                },
                {
                  'border-warning': getonlystatuts == 'Pending',
                },
                {
                  ' border-danger': getonlystatuts == 'NonExisting',
                },
              ]"
              v-model="getonlystatuts"
              placeholder="request status "
              type="text"
              class="form-control rounded border-5"
              disabled
            />
            <button
              class="btn btn-sm btn-danger"
              v-if="getonlystatuts == 'Pending'"
              @click="deleteFixBooking()"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-12 mt-4 mb-4">
          <div class="input-group">
            <span
              class="input-group-text bg-dark text-white"
              id="inputGroup-sizing-default"
              >Comment</span
            >
            <textarea
              @change="resetsubit()"
              rows="2"
              class="form-control"
              style="resize: none"
              v-model="comment"
            ></textarea>
            <div
              class="bg-success text-white"
              v-if="Getdesk && !code && comment"
            >
              <button
                class="border-0 btn btn-success h-100"
                @click="addfixbooking()"
                v-if="!Getdesk.fixDeskUserId"
              >
                <i class="fa fa-check fa-2x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Alert v-if="error">{{ error.message }}</Alert>
  </div>
</template>
<script>
import moment from "moment";
import SwitchAlert from "../components/ui/SwitchAlert.vue";
import { sharedDeskService } from "../services/desk-service";
import Spinner from "../components/ui/Spinner.vue";
import Alert from "../components/ui/Alert.vue";
export default {
  data() {
    return {
      selectDesk: "",
      Today: moment().format("yyyy-MM-DD"),
      startdate: moment().format("yyyy-MM-DD"),
      code: "",
      comment: "",
      code_delete: "",
    };
  },
  components: { SwitchAlert, Spinner, Alert },
  computed: {
    desks() {
      return this.$store.getters.desks;
    },
    fixStatus() {
      return this.$store.getters.fixStatus;
    },
    error() {
      return this.$store.getters.errorDES;
    },
    loading() {
      return this.$store.getters.loadingDES;
    },
    getonlystatuts() {
      /* to return border as default !this.code_delete every time we make "" */
      if (this.fixStatus && !this.code_delete && !this.code) {
        //هي الشرط لحتى ترجع بيضة بعد الحذغ او اراسال تعليق ماتبقى حمرا او حضرا
        return this.fixStatus.status;
      } else {
        return "";//ليرجعها للافتراضي
      }
    },
    Getdesk() {
      if (this.selectDesk.index >= 0) {
        return this.desks[this.selectDesk.index];
      } else {
        return null;
      }
    },
  },
  methods: {
    loadDesks() {
      this.$store.dispatch("loadDesks");
    },
    addfixbooking() {
      sharedDeskService
        .addFixbooking(this.Getdesk.id, this.comment)
        .then((response) => {
          if (response.status) {
            this.code = response.status;
          }
        })
        .catch((error) => {
          this.code = error.response.status;
        })
        .finally(((this.comment = ""), (this.selectDesk = "")));
    },
    deleteFixBooking() {
      sharedDeskService
        .deletFlixDsek(this.Getdesk.id)
        .then((res) => {
          this.code_delete = res.status;
          this.selectDesk = "";
        })
        .catch((error) => {
          this.code_delete = error.response.status;
        });
    },
    loadStatusFix() {
      this.$store.dispatch("loadStatusFix", this.Getdesk.id);
    },
    resetsubit() {
      this.code = "";
      this.code_delete = "";
    },
  },
  mounted() {
    this.loadDesks();
  },
};
</script>

<style lang="scss" scoped></style>
