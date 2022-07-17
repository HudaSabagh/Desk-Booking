<template>
  <div class="test card rounded-3 text-black">
    <div class="card-body p-md-5 mx-md-5">
      <div class="text-center">
        <h4 class="mt-1 mb-5 pb-4">SIGN UP</h4>
      </div>

      <form @submit.prevent="onSubmit()">
        <Alert v-if="error">{{ error.message }}</Alert>

        <div class="row">
          <div class="col form-outline mb-3">
            <label class="form-label" for="first-name">First Name</label>
            <input
              type="first-name"
              id="first-name"
              class="form-control"
              v-model="firstName"
              required
            />
          </div>

          <div class="col form-outline mb-3">
            <label class="form-label" for="last-name">Last Name</label>
            <input
              type="last-name"
              id="last-name"
              class="form-control"
              v-model="lastName"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="department" class="form-label">Department</label>
          <select class="form-select" id="department" v-model="department">
            <option selected disabled value="">Choose a department</option>
            <option value="1">Android</option>
            <option value="1">Deep Dive</option>
            <option value="1">Angular</option>
            <option value="1">Backend</option>
          </select>
          <div id="department" class="invalid-feedback" v-if="!department">
            Please select a valid department.
          </div>
        </div>

        <div class="form-outline mb-3">
          <label class="form-label" for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>

        <div class="form-outline mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>

        <div class="form-outline mb-3">
          <label class="form-label" for="password-repeat"
            >Confirm Password</label
          >
          <input
            type="password"
            id="password-repeat"
            class="form-control"
            v-model="passwordRepeat"
            required
          />
        </div>

        <div class="d-grid gap-2 mb-5">
          <Spinner v-if="loading"></Spinner>
          <button v-else class="btn btn-dark mb-5" type="submit">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from "../components/ui/Alert.vue";
import Spinner from "../components/ui/Spinner.vue";
import { sharedAuthService } from "../services/auth-service";

export default {
  components: { Alert, Spinner },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      department: "",
      password: "",
      passwordRepeat: "",
      error: null,
      loading: false,
    };
  },

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

  methods: {
    onSubmit() {
      this.error = null;

      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.department &&
        this.password &&
        !this.passwordsDoNotMatch &&
        !this.loading
      ) {

        this.loading = true;

        sharedAuthService
          .signUp(
            this.firstName,
            this.lastName,
            this.email,
            this.department,
            this.password
          )
          .then(() => {
            this.$router.push({ name: "login" });
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
};
</script>

<style lang="scss" scoped>
.test {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
