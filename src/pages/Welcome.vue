<template>
  <div class="container">
    <div class="row align-items-center justify-content-between mb-5">
      <div class="col-md">
        <img
          src="../assets/set.jpg"
          class="img-fluid d-none d-sm-block"
          alt="settings"
        />
      </div>

      <div class="col-md p-5">
        <h3 class="text-primary">Welcome to DeskBooking Platform</h3>
        <p class="lead text-danger text-center">Your space. Your time</p>
        <h5 class="font-weight-bold text-secondary">
          Make flexible working work for you. Find workspaces that suit your
          plans and reserve them in moments.
        </h5>
      </div>
    </div>
    <div class="my-5 huda">
      <div class="border border-dark p-2 w-50 mx-auto mb-5">
        <h3 class="text-center text-dark">
          This is how the workplace booking software works
        </h3>
      </div>

      <carousel-3d>
        <slide :index="0">
          <img
            src="../assets/1.jpg"
            class="img-fluid d-none d-sm-block"
            alt="settings"
          />
        </slide>
        <slide :index="1">
          <img
            src="../assets/2-3.jpg"
            class="img-fluid d-none d-sm-block"
            alt="settings"
          />
        </slide>
        <slide :index="2">
          <img
            src="../assets/4.jpg"
            class="img-fluid d-none d-sm-block"
            alt="settings"
          />
        </slide>
        <slide :index="3"
          ><img
            src="../assets/5.jpg"
            class="img-fluid d-none d-sm-block"
            alt="settings"
          />
        </slide>
        <slide :index="4">
          <img
            src="../assets/6.jpg"
            class="img-fluid d-none d-sm-block"
            alt="settings"
          />
        </slide>
        <slide :index="5">
          <img
            src="../assets/7.jpg"
            class="img-fluid d-none d-sm-block"
            alt="settings"
          />
        </slide>
      </carousel-3d>
    </div>
    <div class="row text-center g-4">
      <div class="col-md">
        <div class="card">
          <div class="card-body border border-primary text-center">
            <div class="h1 mb-3">
              <i class="bi bi-display text-primary"></i>
            </div>
            <h3 class="card-title mb-3 text-primary">Book now</h3>
            <p class="card-text mb-4 px-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
              recusandae quos odio deserunt voluptas enim perferendis ducimus
              soluta quam unde? Dolorem quia saepe magnam distinctio ipsam a
              debitis nihil eos.
            </p>
            <router-link :to="{ name: 'booking' }">
              <button class="btn btn-primary text-white bg-primary">
                Read More
              </button></router-link
            >
          </div>
        </div>
      </div>

      <div class="col-md">
        <div class="card">
          <div class="card-body border border-danger text-center">
            <div class="h1 mb-3">
              <i class="bi bi-suit-heart text-danger"></i>
            </div>
            <h3 class="card-title mb-3 text-danger">See Favourites</h3>
            <p class="card-text mb-4 px-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
              recusandae quos odio deserunt voluptas enim perferendis ducimus
              soluta quam unde? Dolorem quia saepe magnam distinctio ipsam a
              debitis nihil eos.
            </p>
            <router-link :to="{ name: 'favourite' }">
              <button class="btn btn-danger text-white bg-danger">
                Read More
              </button></router-link
            >
          </div>
        </div>
      </div>

      <div class="col-md">
        <div class="card">
          <div class="card-body border border-success text-center">
            <div class="h1 mb-3">
              <i class="bi bi-person text-success"></i>
            </div>
            <h3 class="card-title mb-3 text-success">Profile</h3>
            <p class="card-text mb-4 px-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
              recusandae quos odio deserunt voluptas enim perferendis ducimus
              soluta quam unde? Dolorem quia saepe magnam distinctio ipsam a
              debitis nihil eos.
            </p>
            <router-link :to="{ name: 'profile' }">
              <button class="btn bg-success text-white">
                Read More
              </button></router-link
            >
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
.btn {
  background-color: $main-dark;
  color: $main-light;
}
@media (max-width: 1023px) {
  .huda {
    display: none;
  }
}
</style>
