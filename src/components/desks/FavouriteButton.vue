<template>
  <div class="button">
    <button
      class="btn btn-outline-dark"
      :class="{ active: isActive }"
      @click="(isActive = !isActive), AddFav(id)"
    >
      ❤
    </button>
  </div>
</template>

<script>
import { sharedUserFavourites } from "@/services/favourite-service";
export default {
  data() {
    return {
      isActive: false,
      deskId: "",
      loading: false,
      error: null,
    };
  },

  props: {
    id: String,
  },

  methods: {
    toggle() {
      this.isActive = !this.enable;
    },

    AddFav(id) {

      this.error = null;

      this.loading = true;

      sharedUserFavourites
        .addFavouriteDesk(id)
        .then((response) => {
          console.log(response.data);

          if (response.status) {
            console.log("good news");
          }
        })
        .catch((error) => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>