import { userService } from "../services/profile-service";

export const UserStore = {
  state: {
    users: [],
    loading: false,
    error: null,
    user: null,
  },
  getters: {
    users(state) {
      return state.users;
    },
    loadingUser(state) {
      return state.loading;
    },
    errorUser(state) {
      return state.error;
    },
    user(state) {
      return state.user;
    },
  },

  actions: {
    async loadUsers(context) {
      context.commit("startLoadingUsers");
      try {
        let users = [];

        users = await userService.getAllUsers();

        context.commit("setUsers", users);
      } catch (error) {
        context.commit("setLoadingUsersError", error);
      }
    },

    async loadUser(context, id) {
      context.commit("startLoadingUser");

      try {
        const user = await userService.getUserById(id);
        context.commit("setUser", user);
      } catch (error) {
        context.commit("setLoadingUsersError", error);
      }
    },
  },
  mutations: {
    startLoadingUsers(state) {
      state.loading = true;
      state.error = null;
      state.users = [];
    },
    setUsers(state, users) {
      state.loading = false;
      state.users = users;
    },
    setLoadingUsersError(state, error) {
      state.loading = false;
      state.error = error;
    },
    startLoadingUser(state) {
      state.user = null;
      state.error = null;
      state.loading = true;
    },
    setUser(state, user) {
      state.user = user;
      state.loading = false;
    },
  },
};
