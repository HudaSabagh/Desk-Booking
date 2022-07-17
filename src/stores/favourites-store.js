import { sharedUserFavourites } from "../services/favourite-service";

export const FavouritesStore = {
  state: {
    Favourites: [],
    loading: false, //we will add loading which will be a flag that communication between Vue.js application and server is in progress
    error: null, //we can add an error response if something went wrong in communication with the server
    favourite: null, //
  },
  //we can use Vuex state in Vue.js components
  getters: {
    Favourites(state) {
      return state.Favourites;
    },
    loadingFavourite(state) {
      return state.loading;
    },
    errorFavourite(state) {
      return state.error;
    },
    Favourite(state) {
      return state.favourite;
    },
  },
  // method that will using our function for making ajax call to the server or api calls
  actions: {
    async loadFavourites(context) {
      //async-await to prevent you to go to hell, I mean callback hell. :)
      context.commit("startLoadingFavourites");
      //it is a good UX to show to the user that data from the server is in the process of loading. So the user will know that something is happening in the background.

      try {
        let Favourites = [];
        Favourites = await sharedUserFavourites.getUserFavourites();
        //we need to handle the response from the server. With setting await in front of the function, we are specifying that that part of the code is asynchronous so the code below will not be executed until the asynchronous function is done. This way, this ES6 feature with async-await prevent you to go to hell, I mean callback hell. :)

        context.commit("setFavourites", Favourites);
      } catch (error) {
        context.commit("setLoadingFavouritesError", error);
      }
    }, //try catch block in order to handle error case when using async-await
  },
  //Now we have to update the state with the new values. If the request to the server was successful, we need to update the data state,
  mutations: {
    startLoadingFavourites(state) {
      state.loading = true;
      state.error = null;
      state.Favourites = [];
    },
    setFavourites(state, Favourites) {
      state.loading = false;
      state.Favourites = Favourites;
    },
    setLoadingFavouritesError(state, error) {

      
      state.loading = false; //Also, we need to update the loading state, so the user will know that the request to the server is finished.
      state.error = error; // we need to update the error state in other to show the user a message that something went wrong with fetching the data
    },
    startLoadingfavourite(state) {
      state.favourite = null;
      state.error = null;
      state.loading = true;
    },
    setfavourite(state, favourite) {
      state.favourite = favourite;
      state.loading = false;
    },
  },
};
