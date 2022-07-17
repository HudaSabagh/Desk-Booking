<template>
  <div class="container-fluid px-3 mt-5">
    <div class="row w-75 mx-auto">
      <h2 class="text-center text-danger m-4">Admin Setting</h2>
      <router-link :to="{ name: 'request' }" class="btn btn-success mt-5">
        <h4>
          <div class="sb-nav-link-icon">
            <i class="fa fa-check-square text-white"></i>
          </div>
          Show All requests
        </h4>
      </router-link>
      <router-link :to="{ name: 'adminComments' }" class="btn btn-success mt-4">
        <h4>
          <div class="sb-nav-link-icon">
            <i class="fa fa-comment text-white"></i>
          </div>
          Show All Comments
        </h4>
      </router-link>
      <router-link :to="{ name: 'adminUsers' }" class="btn btn-success mt-4">
        <h4>
          <div class="sb-nav-link-icon">
            <i class="fa fa-users text-white"></i>
          </div>
          Show All Users
        </h4>
      </router-link>
    </div>
  </div>
</template>
<script></script>
