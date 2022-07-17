import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardLandingPage from "./pages/DashboardLandingPage";
import GetAllOffice from "./pages/GetAllOffice.vue";
import LogoutPage from "./pages/LogoutPage";
import OfficeDetails from "./components/offices/OfficeDetails.vue";
import GetAllDesks from "./pages/GetAllDesks.vue";
import VueRouter from "vue-router";
import Vue from "vue";
import { loggedInGuard } from "./guards/logged-in-guard";
import { loggedOutGuard } from "./guards/logged-out-guard";
import AuthentificationPage from "./pages/AuthentificationPage.vue";
import DesksDetails from "./components/desks/DesksDetails.vue";
import Favourite from "./pages/Favourite.vue";
import Comments from "./pages/Comments.vue";
import Booking from "./pages/Booking.vue";
import UserProfilePage from "./pages/UserProfilePage.vue";
import AdminPage from "./pages/AdminPage.vue";
import BookingDetails from "./components/booking/BookingDetails.vue";
import Welcome from "./pages/Welcome.vue";
import Fixbooking from "./pages/Fixbooking.vue";
import Request from "./components/admin/Request.vue";
import AllAdminComment from "./components/admin/AllAdminComment.vue";
import PromotesUser from "./components/admin/PromotesUser.vue";

const routes = [
  {
    path: "/",
    component: AuthentificationPage,
    beforeEnter: loggedOutGuard, //beforeEnter: action before entering a specific route
    children: [
      {
        path: "/",
        name: "login",
        component: LoginPage,
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: SignUpPage,
      },
    ],
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutPage,
    beforeEnter: loggedInGuard,
  },
  {
    path: "/",
    component: DashboardLandingPage,
    beforeEnter: loggedInGuard,

    children: [
      {
        path: "/welcome",
        name: "dashboard",
        component: Welcome,
      },

      {
        path: "offices",
        name: "offices",
        component: GetAllOffice,
      },
      {
        path: "offices/:id",
        name: "office-detail",
        component: OfficeDetails,
        props: true,
      },
      {
        path: "desks",
        name: "desks",
        component: GetAllDesks,
      },
      {
        path: "desks/:id",
        name: "desks-detail",
        component: DesksDetails,
        props: true,
      },

      {
        path: "user",
        name: "profile",
        component: UserProfilePage,
      },
      {
        path: "favourite",
        name: "favourite",
        component: Favourite,
      },
      {
        path: "booking",
        name: "booking",
        component: Booking,
      },
      {
        path: "admin",
        name: "admin",
        component: AdminPage,
      },
      {
        path: "fixbooking",
        name: "fixbooking",
        component: Fixbooking,
      },

      {
        path: "booking/:id",
        name: "booking-details",
        component: BookingDetails,
        props: true,
      },
      {
        path: "comments",
        name: "comments",
        component: Comments,
      },
      {
        path: "request",
        name: "request",
        component: Request,
      },
      {
        path: "adminComments",
        name: "adminComments",
        component: AllAdminComment,
      },
      {
        path: "adminUsers",
        name: "adminUsers",
        component: PromotesUser,
      },
    ],
  },
];

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  // linkExactActiveClass: "active" // active class for *exact* links.
});
