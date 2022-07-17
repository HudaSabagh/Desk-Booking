<template>
  <div class="getdesks my-5">
    <!-- -->
    <div v-if="loading" class="text-center">
      <Spinner />
    </div>
    <div class="row row-cols-2 row-cols-md-4 g-4" v-if="!loading && !error">
      <div class="col" v-for="desk in desks" :key="desk.id">
        <div class="card h-100 border-0" style="width: 10rem">
          <div class="bg-image">
            <img
              :src="desk.map"
              class="card-img-top shadow"
              :alt="desk.label"
            />
            <div
              class="mask"
              style="background-color: rgba(251, 251, 251, 0.87)"
            >
              <div
                class="d-flex justify-content-center align-items-center h-100"
              > 

                <router-link
                  :to="{ name: 'desks-detail', params: { id: desk.id } }"
                >
                  <button class="btn btn-dark text-white">
                    Show {{ desk.label }}

                    <i class="fa fa-angle-right"></i>
                  </button>
                </router-link>
                <FavouriteButton :id="desk.id" > </FavouriteButton>
                
              </div>
            </div>
          </div>
        </div>
        <div v-if="!desks || desks.length <= 0" class="text-center my-4">
          <Alert variant="info"> No desks found </Alert>
        </div>
      </div>
    </div>

    <div v-if="error">
      <Alert>{{ error.message }}</Alert>
    </div>

    <!-- -->
  </div>
</template>
<script>
import Spinner from "../ui/Spinner.vue";
import Alert from "../ui/Alert.vue";
import FavouriteButton from "../desks/FavouriteButton.vue";

export default {
  name: "GetDesks",
  components: {
    Spinner,
    Alert,
    FavouriteButton,
  },
  props: {
    loading: Boolean,
    error: Error,
    desks: Array,
  },
};
</script>
<style lang="scss"></style>
