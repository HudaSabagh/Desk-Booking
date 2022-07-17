<template>
  <div class="container">
    <div class="col-lg-8 my-5 mx-auto">
      <!--  User Profile Data -->
      <div class="card mb-5 border border-dark">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center text-center">
            <img
              src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="user"
              class="rounded-circle mt-4"
              width="150"
            />

            <div class="mt-3">
              <h4>{{ firstname }} {{ lastname }}</h4>
              <p class="text-secondary mb-1">{{ email }}</p>
              <p class="text-muted font-size-sm">
                Department:&nbsp;&nbsp; {{ department }}
              </p>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button
              v-on:click="(isHidden = !isHidden), (notVisible = true)"
              class="mx-1 btn btn-outline-secondary"
              id="editProfile"
            >
              Edit Profile
            </button>
            <button
              v-on:click="(notVisible = !notVisible), (isHidden = true)"
              class="btn mx-1 btn-outline-secondary"
            >
              Change Pasword
            </button>
            <router-link
              class="btn mx-1 btn-outline-danger"
              :to="{ name: 'logout' }"
              >Logout</router-link
            >
          </div>
        </div>
      </div>
      <!-- User edit section -->
      <form @submit.prevent="onSubmit()">
        <div class="card border border-dark" v-if="!isHidden">
          <div class="card-body mt-4">
            <h4 class="mt-4 mb-5 text-danger">
              Change your profile information
            </h4>

            <div class="row mb-3">
              <div class="col-sm-3">
                <label for="firstName" class="col-form-label">First Name</label>
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  v-model="firstname"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-sm-3">
                <label for="lastName" class="col-form-label">Last Name</label>
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  id="LastName"
                  class="form-control"
                  v-model="lastname"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-sm-3">
                <label for="email" class="col-form-label">Email</label>
              </div>
              <div class="col-sm-9">
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="email"
                />
              </div>
            </div>

            <div class="row mb-5">
              <div class="col-sm-3">
                <label for="department" class="col-form-label"
                  >Department</label
                >
              </div>
              <div class="col-sm-9">
                <select
                  class="form-select"
                  id="department"
                  v-model="department"
                >
                  <option selected disabled value="">Change department</option>
                  <option value="Android">Android</option>
                  <option value="Deep Dive">Deep Dive</option>
                  <option value="Angular">Angular</option>
                  <option value="1">Backend</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <input
                  v-if="vrifform"
                  type="submit"
                  class="btn btn-outline-success px-4 me-2"
                  value="Save changes"
                />
                <input
                  type="submit"
                  class="btn btn-outline-danger px-4"
                  value="Cancel"
                />
              </div>
              <div class="mt-3">
                <SwitchAlert
                  :showcondition="code"
                  :success="code == 200"
                  :err="code !== 200"
                  :msgsucc="'Changed scuccessfully'"
                  :msgerr="'Error '"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <!-- User reset password section -->
      <div class="col-lg-12 mb-3" v-if="!notVisible">
        <div class="card border border-dark">
          <div class="card-body">
            <h5 class="mt-4 mb-5 text-danger">Change your password</h5>

            <form @submit.prevent="updatePassword()">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <label for="pasword" class="col-form-label"
                    >New Password</label
                  >
                </div>
                <div class="col-sm-9">
                  <input
                    type="password"
                    id="pasword"
                    class="form-control"
                    v-model="password"
                  />
                  <div class="invalid-feedback d-block" v-if="!password">
                    Required
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-3">
                  <label for="password-repeat" class="col-form-label"
                    >Confirm Password</label
                  >
                </div>
                <div class="col-sm-9">
                  <input
                    type="password"
                    id="password-repeat"
                    class="form-control"
                    v-model="passwordRepeat"
                  />
                  <div
                    class="invalid-feedback d-block"
                    v-if="passwordsDoNotMatch"
                  >
                    Passwords don't match!
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-3"></div>
                <div class="col-sm-9 d-flex">
                  <input
                    type="submit"
                    class="btn btn-outline-success px-4 me-2"
                    value="Change"
                  />
                  <input
                    type="submit"
                    class="btn btn-outline-danger px-4"
                    value="Cancel"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from "../services/profile-service";
import { sharedAuthService } from "../services/auth-service";
import SwitchAlert from "../components/ui/SwitchAlert.vue";


export default {
  data() {
    return {
      code: "",
      vrifform: false,

      isHidden: true,
      notVisible: true,

      email: "",
      firstname: "",
      lastname: "",
      department: "",

      password: "",
      passwordRepeat: "",

      loading: false,
      error: null,
    };
  },
  components: { SwitchAlert },

  computed: {
    passwordsDoNotMatch() {
      if (
        this.password &&
        this.passwordRepeat &&
        this.password !== this.passwordRepeat
      ) {
        return true;
      }

      return false;
    },
  },

  mounted() {
    userService.getUserById(sharedAuthService.getUserId()).then((response) => {
      this.firstname = response.data.firstname;
      this.lastname = response.data.lastname;
      this.email = response.data.email;
      this.department = response.data.department;
    });
  },

  methods: {
    onSubmit() {
      this.error = null;

      if (
        this.firstname &&
        this.lastname &&
        this.department &&
        this.email &&
        !this.loading
      ) {
        this.loading = true;

        userService
          .updateUserProfile(
            this.firstname,
            this.lastname,
            this.department,
            this.email
          )
          .then((response) => {
            if (response.status) {
              this.code = response.status;
            }
          })
          .catch((error) => {
            this.error = error;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    updatePassword() {
      this.error = null;

      if (this.password && !this.passwordsDoNotMatch) {
        this.loading = true;

        userService
          .updateUserPassword(this.password)
          .then(() => {

          })
          .catch((error) => {
            this.error = error;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },

  watch: {
    firstname: function (val) {
      if (val.length >= 3) {
        return (this.vrifform = true);
      } else {
        this.vrifform = false;
      }
    },

    lastname: function (val) {
      if (val.length >= 3) {
        return (this.vrifform = true);
      } else {
        this.vrifform = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
textarea:focus {
  border-color: green;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}
#department:focus {
  border-color: green;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}
</style>
