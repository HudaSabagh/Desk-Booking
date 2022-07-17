import Vue from "vue";
import App from "./App.vue";
import { router } from "./routing";
import { store } from "./stores/main-store";
import axios from "axios";
import { sharedAuthService } from "./services/auth-service";
import JwPagination from "jw-vue-pagination";
import moment from "moment";
import Carousel3d from "vue-carousel-3d";


Vue.config.productionTip = false;
Vue.component("jw-pagination", JwPagination);
Vue.use(Carousel3d);
Vue.prototype.moment = moment;

axios.interceptors.request.use(function (config) {
  if (sharedAuthService.isLoggedIn()) {
    config.headers.Authorization = `Bearer ${sharedAuthService.getToken()}`;
  }

  return config;
});

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
