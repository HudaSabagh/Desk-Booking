<template>
  <div class="getoffice">
    <div
      class="row row-cols-1 row-cols-md-3 g-4 my-4"
      v-if="!loading && !error"
    >
      <div class="col" v-for="office in offices" :key="office.id">
        <div class="card h-100 border-0">
          <div class="bg-image">
            <img
              :src="office.map"
              class="card-img-top shadow"
              alt="Hollywood Sign on The Hill"
            />
            <div
              class="mask"
              style="background-color: rgba(251, 251, 251, 0.87)"
            >
              <div
                class="d-flex justify-content-center align-items-center h-100"
              >
                <router-link
                  :to="{ name: 'office-detail', params: { id: office.id } }"
                >
                  <button class="btn btn-dark text-white">
                    Show {{ office.name }}

                    <i class="fa fa-angle-right"></i>
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!offices || offices.length <= 0" class="text-center my-4">
          <Alert variant="info"> No offices found </Alert>
        </div>
      </div>
    </div>
    <div v-if="loading" class="text-center">
      <Spinner />
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

export default {
  name: "Getoffice.vue",
  components: {
    Spinner,
    Alert,
  },
  props: {
    loading: Boolean,
    error: Error,
    offices: Array,
  },
};
</script>
<style lang="scss">
.office {
  background-color: $main-dark;
}
.bg-image {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-image .mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
}
</style>
