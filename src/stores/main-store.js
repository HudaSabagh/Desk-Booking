import Vue from "vue";
import Vuex from "vuex";
import { officesStore } from "./offices-store";
import { desksStore } from "./desks-store";
import { BookingStore } from "./booking-store";
import JwPagination from "jw-vue-pagination";
import { FavouritesStore } from "./favourites-store";
import { UserStore } from "./user-store";

import { AdminStore } from "./admin-store";
Vue.use(Vuex);
Vue.component("jw-pagination", JwPagination);
export const store = new Vuex.Store({
  modules: {
    office: officesStore,
    desk: desksStore,
    BookingStore: BookingStore,
    fav: FavouritesStore,
    admin: AdminStore,
    user: UserStore,
  },
});
