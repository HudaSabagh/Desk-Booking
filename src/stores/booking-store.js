import { sharedBookService } from "../services/bookings-service";

export const BookingStore = {
  state: {
    Bookings: [],
    loadingBook: false,
    errorBook: null,
    booking: null,
  },
  getters: {
    Bookings(state) {
      return state.Bookings;
    },
    loadingBook(state) {
      return state.loadingBook;
    },
    errorBook(state) {
      return state.errorBook;
    },
    booking(state) {
      return state.booking;
    },
  },

  actions: {
    async loadbookings(context) {
      context.commit("startLoadingBookings");

      try {
        let Bookings = [];

        Bookings = await sharedBookService.getAllBookings();

        context.commit("Bookings", Bookings);
      } catch (error) {
        context.commit("setLoadingBookingsError", error);
      }
    },
    async loadBooking(context, id) {
      context.commit("startLoadingBooking");
      try {
        const booking = await sharedBookService.getBookingById(id);
        context.commit("setBooking", booking);
      } catch (error) {
        context.commit("setLoadingBookingsError", error);
      }
    },
  },
  mutations: {
    startLoadingBookings(state) {
      state.loadingBook = true;
      state.errorBook = null;
      state.Bookings = [];
    },
    startLoadingBooking(state) {
      state.loadingBook = true;
      state.errorBook = null;
      state.Booking = null;
    },

    Bookings(state, Bookings) {
      state.loadingBook = false;
      state.Bookings = Bookings;
    },
    setLoadingBookingsError(state, error) {
      state.loadingBook = false;
      state.errorBook = error;
    },
    setBooking(state, booking) {
      state.booking = booking;
      state.loading = false;
    },
  },
};
