import { sharedDeskService } from "../services/desk-service";

export const desksStore = {
  state: {
    desks: [],
    loading: false,
    error: null,
    desk: null,
    fixStatus: null,
    comments: [],
    comment: null,
  },
  getters: {
    desks(state) {
      return state.desks;
    },
    comments(state) {
      return state.comments;
    },
    comment(state) {
      return state.comment;
    },
    desk(state) {
      return state.desk;
    },
    loadingDES(state) {
      return state.loading;
    },
    errorDES(state) {
      return state.error;
    },
    fixStatus(state) {
      return state.fixStatus;
    },
  },

  actions: {
    async loadDesks(context) {
      context.commit("startLoadingDesk");
      try {
        let desks = [];
        desks = await sharedDeskService.getAllDesks();
        context.commit("setDesks", desks);
      } catch (error) {
        context.commit("setLoadingDeskError", error);
      }
    },
    async loadComments(context, id) {
      context.commit("startLoadingComments");
      try {
        let comments = [];
        comments = await sharedDeskService.getAllFlexComments(id);
        context.commit("setComments", comments);
      } catch (error) {
        context.commit("setLoadingDeskError", error);
      }
    },
    async loadComment(context, dataComment) {
      context.commit("startLoadingComments");
      try {
        const comment = await sharedDeskService.getOneComment(
          dataComment[0],
          dataComment[1]
        );
        context.commit("setComment", comment);
      } catch (error) {
        context.commit("setLoadingDeskError", error);
      }
    },
    async loadDesk(context, id) {
      context.commit("startLoadingDesk");
      try {
        const desk = await sharedDeskService.getDeskById(id);
        context.commit("setDesk", desk);
      } catch (error) {
        context.commit("setLoadingDeskError", error);
      }
    },
    async loadStatusFix(context, id) {
      context.commit("startLoadingStatus");
      try {
        const fixStatus = await sharedDeskService.getStatusFix(id);
        context.commit("setStatus", fixStatus);
      } catch (error) {
        context.commit("setLoadingDeskError", error);
      }
    },
  },
  mutations: {
    startLoadingDesk(state) {
      state.loading = true;
      state.error = null;
      state.desks = [];
    },
    startLoadingComments(state) {
      state.loading = true;
      state.error = null;
      state.comments = [];
    },
    startLoadingComment(state) {
      state.loading = true;
      state.error = null;
      state.comment = null;
    },
    startLoadingStatus(state) {
      state.loading = true;
      state.error = null;
      state.fixStatus = null;
    },
    setLoadingDeskError(state, error) {
      state.loading = false;
      state.error = error;
    },

    setDesks(state, desks) {
      state.loading = false;
      state.desks = desks;
    },
    setComments(state, comments) {
      state.loading = false;
      state.comments = comments;
    },
    setDesk(state, desk) {
      state.desk = desk;
      state.loading = false;
    },
    setComment(state, comment) {
      state.comment = comment;
      state.loading = false;
    },
    setStatus(state, fixStatus) {
      state.fixStatus = fixStatus;
      state.loading = false;
    },
  },
};
