import { sharedAdminService } from "../services/admin-service";
export const AdminStore = {
  state: {
    requests: [],
    loadingReq: false,
    errorReq: null,
    request: false,
    adcomments: [],
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    request(state) {
      return state.request;
    },
    loadingReq(state) {
      return state.loadingReq;
    },
    errorReq(state) {
      return state.errorReq;
    },
    adcomments(state) {
      return state.adcomments;
    },
  },

  actions: {
    async loadRequests(context) {
      context.commit("startLoadingRequests");

      try {
        let requests = [];

        requests = await sharedAdminService.getAllFixRequest();

        context.commit("requests", requests);
      } catch (error) {
        context.commit("setLoadingRequestsError", error);
      }
    },
    async loadReq(context, id) {
      context.commit("startLoadingReq");

      try {
        const request = await sharedAdminService.getReqById(id);
        context.commit("request", request);
      } catch (error) {
        context.commit("setLoadingRequestsError", error);
      }
    },
    async allComments(context) {
      context.commit("startLoadingComments");

      try {
        let adcomments = [];

        adcomments = await sharedAdminService.getAllComments();

        context.commit("setComments", adcomments);
      } catch (error) {
        context.commit("setLoadingRequestsError", error);
      }
    },
  },
  mutations: {
    startLoadingRequests(state) {
      state.loadingReq = true;
      state.errorReq = null;
      state.requests = [];
    },
    startLoadingReq(state) {
      state.loadingReq = true;
      state.errorReq = null;
      state.request = null;
    },
    requests(state, requests) {
      state.requests = false;
      state.requests = requests;
    },
    request(state, request) {
      state.request = false;
      state.request = request;
    },
    setLoadingRequestsError(state, error) {
      state.loadingReq = false;
      state.errorReq = error;
    },
    startLoadingComments(state) {
      state.loading = true;
      state.error = null;
      state.adcomments = [];
    },
    setComments(state, adcomments) {
      state.loading = false;
      state.adcomments = adcomments;
    },
  },
};
