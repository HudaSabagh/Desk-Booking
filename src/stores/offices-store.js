import { sharedOfficeService } from "../services/offices-service";

export const officesStore = {
  state: {
    offices: [],
    loading: false,
    error: null,
    office: null,
  },
  getters: {
    offices(state) {
      return state.offices;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    office(state) {
      return state.office;
    },
  },

  actions: {
    async loadOffices(context) {
      context.commit("startLoadingOffices");

      try {
        let offices = [];

        offices = await sharedOfficeService.getAllOffices();

        context.commit("setOffices", offices);
      } catch (error) {
        context.commit("setLoadingOfficesError", error);
      }
    },
    async loadOffice(context, id) {
      context.commit("startLoadingOffice");

      try {
        const office = await sharedOfficeService.getOfficeById(id);
        context.commit("setOffice", office);
      } catch (error) {
        context.commit("setLoadingOfficeError", error);
      }
    },
  },
  mutations: {
    startLoadingOffices(state) {
      state.loading = true;
      state.error = null;
      state.offices = [];
    },
    setOffices(state, offices) {
      state.loading = false;
      state.offices = offices;
    },
    setLoadingOfficesError(state, error) {
      state.loading = false;
      state.error = error;
    },
    startLoadingOffice(state) {
      state.office = null;
      state.error = null;
      state.loading = true;
    },
    setOffice(state, office) {
      state.office = office;
      state.loading = false;
    },
    setLoadingOfficeError(state, error) {
      state.error = error;
      state.loading = false;
    },
  },
};
