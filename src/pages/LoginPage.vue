<template>
  <div id="login" class="bg-dark">
    <div class="container-fluid min-vh-100">
      <div class="test card rounded-3 text-black">
        <div class="card-body p-md-5 mx-md-5">
          <div class="text-center">
            <h2 class="mt-1 mb-5 pb-4">LOG IN</h2>
          </div>
          <div id="login-box" class="col-md-12">
            <form @submit.prevent="onSubmit()">
              <Alert v-if="error">{{ error.message }}</Alert>

              <div class="form-outline mb-3">
                <label class="form-label" for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="email address"
                  v-model="email"
                />
              </div>

              <div class="form-outline mb-3">
                <label class="form-label" for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                />
              </div>

              <div class="mb-5 form-check">
                <input type="checkbox" class="form-check-input" id="check" />
                <label class="form-check-label" for="check">Remember me</label>
              </div>

              <div class="d-grid gap-2 mb-5">
                <Spinner v-if="loading"></Spinner>
                <button v-else class="btn btn-dark bg-dark mb-5" type="submit">
                  Log in
                </button>
              </div>

              <div class="text-center">
                <router-link to="/sign-up"
                  >Not a member? Create an account here</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../components/ui/Alert.vue";
import Spinner from "../components/ui/Spinner.vue";
import { sharedAuthService } from "../services/auth-service";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false,
    };
  },

  methods: {
    onSubmit() {
      this.error = null;

      if (this.email && this.password && !this.loading) {
        this.loading = true;

        sharedAuthService
          .login(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "dashboard" });
          })
          .catch((error) => {
            this.error = error;
            console.log("request error", error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },

  components: {
    Alert,
    Spinner,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: $main-light-blue;
}
#login .container #login-box {
  border: 1px solid #a31b1b;
}
.test {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
