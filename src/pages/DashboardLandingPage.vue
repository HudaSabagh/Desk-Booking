<template>
  <div>
    <body class="sb-nav-fixed">
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3">DeskBooking</a>
        <!-- Sidebar Toggle-->
        <button
          class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          @click="close()"
        >
          <i class="fas fa-bars"></i>
        </button>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto me-3 me-lg-4">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ><i class="fas fa-user fa-fw"></i
            ></a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <router-link class="dropdown-item" :to="{ name: 'profile' }"
                  >Profile</router-link
                >
              </li>
              <hr class="dropdown-divider" />
              <li>
                <router-link class="dropdown-item" :to="{ name: 'logout' }"
                  >Logout</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            class="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div class="sb-sidenav-menu">
              <div class="nav">
                <div class="sb-sidenav-menu-heading">System</div>

                <router-link :to="{ name: 'dashboard' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="fa fa-home"></i>
                  </div>
                  Home
                </router-link>
                <router-link :to="{ name: 'offices' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="fa fa-university"></i>
                  </div>
                  Offices
                </router-link>
                <router-link :to="{ name: 'desks' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="fa fa-desktop"></i>
                  </div>
                  Desks
                </router-link>

                <router-link :to="{ name: 'favourite' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="far fa-heart"></i>
                  </div>
                  Favourite
                </router-link>
                <div class="sb-sidenav-menu-heading">Services</div>
                <a
                  class="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div class="sb-nav-link-icon">
                    <svg
                      class="svg-inline--fa fa-columns fa-w-16"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="columns"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"
                      ></path>
                    </svg>
                  </div>
                  Booking
                  <div class="sb-sidenav-collapse-arrow">
                    <svg
                      class="svg-inline--fa fa-angle-down fa-w-10"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="angle-down"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                      ></path>
                    </svg>
                  </div>
                </a>
                <div
                  class="collapse show"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                  style=""
                >
                  <nav class="sb-sidenav-menu-nested nav">
                    <router-link :to="{ name: 'booking' }" class="nav-link">
                      <div class="sb-nav-link-icon">
                        <i class="fa fa-life-ring"></i>
                      </div>
                      Flex
                    </router-link>
                    <router-link :to="{ name: 'fixbooking' }" class="nav-link">
                      <div class="sb-nav-link-icon">
                        <i
                          class="fas fa-american-sign-language-interpreting"
                        ></i>
                      </div>

                      Fix
                    </router-link>
                  </nav>
                </div>
                <router-link :to="{ name: 'comments' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="far fa-comments"></i>
                  </div>
                  Comments
                </router-link>

                <div class="sb-sidenav-menu-heading">Settings</div>
                <router-link :to="{ name: 'profile' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="far fa-user"></i>
                  </div>
                  Profile
                </router-link>
                <router-link
                  :to="{ name: 'admin' }"
                  class="nav-link"
                  v-if="isAdmin == true"
                >
                  <div class="sb-nav-link-icon">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                  </div>
                  Admin
                </router-link>
                <router-link :to="{ name: 'logout' }" class="nav-link">
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-sign-out-alt"></i>
                  </div>
                  Logout
                </router-link>
              </div>
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <router-view></router-view>
          </main>
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div
                class="d-flex align-items-center justify-content-between small"
              >
                <div class="text-muted">Copyright &copy; DeskBooking 2022</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </body>
  </div>
</template>
<script>
import { userService } from "../services/profile-service";
import { sharedAuthService } from "../services/auth-service";
export default {
  data() {
    return {
      isAdmin: "",
    };
  },
  methods: {
    close() {
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    },
  },
  mounted() {
    userService.getUserById(sharedAuthService.getUserId()).then((response) => {
      this.isAdmin = response.data.isAdmin;
    });
  },
};
</script>
<style lang="scss">
.active {
  background-color: rgb(99, 96, 96);
  color: aliceblue;
}
.fixed-top,
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav,
.sb-nav-fixed .sb-topnav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
} //fix sidebar on the top

.sb-nav-fixed .sb-topnav {
  z-index: 1039;
}
.sb-topnav {
  padding-left: 0;
  height: 56px;
  z-index: 1039;
}
.sb-topnav .navbar-brand {
  width: 225px;
  margin: 0;
}
.sb-topnav.navbar-dark #sidebarToggle {
  color: rgba(255, 255, 255, 0.5);
}
.sb-topnav.navbar-light #sidebarToggle {
  color: #212529;
}
.nav .nav-link .sb-nav-link-icon,
.sb-sidenav-menu .nav-link .sb-nav-link-icon {
  margin-right: 0.5rem;
}
#layoutSidenav {
  display: flex;
}
#layoutSidenav #layoutSidenav_nav {
  flex-basis: 225px;
  flex-shrink: 0;
  transition: transform 0.15s ease-in-out;
  z-index: 1038;
  transform: translateX(-225px);
}
#layoutSidenav #layoutSidenav_content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  flex-grow: 1;
  min-height: calc(100vh - 56px);
  margin-left: -225px;
}

.sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
  transform: translateX(0);
}
.sb-sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1037;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

@media (min-width: 992px) {
  #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0);
  }
  #layoutSidenav #layoutSidenav_content {
    margin-left: 0;
    transition: margin 0.15s ease-in-out;
  }

  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_nav {
    transform: translateX(-225px);
  }
  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_content {
    margin-left: -225px;
  }
  .sb-sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
    display: none;
  }
}

.sb-nav-fixed #layoutSidenav #layoutSidenav_nav {
  width: 225px;
  height: 100vh;
  z-index: 1038;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav .sb-sidenav {
  padding-top: 56px;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_nav .sb-sidenav .sb-sidenav-menu {
  overflow-y: auto;
}
.sb-nav-fixed #layoutSidenav #layoutSidenav_content {
  padding-left: 225px;
  top: 56px;
}

#layoutError {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#layoutError #layoutError_content {
  min-width: 0;
  flex-grow: 1;
}
#layoutError #layoutError_footer {
  min-width: 0;
}

.sb-sidenav {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-wrap: nowrap;
}
.sb-sidenav .sb-sidenav-menu {
  flex-grow: 1;
}
.sb-sidenav .sb-sidenav-menu .nav {
  flex-direction: column;
  flex-wrap: nowrap;
}
.sb-sidenav .sb-sidenav-menu .nav .sb-sidenav-menu-heading {
  padding: 1.75rem 1rem 0.75rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link {
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  position: relative;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link .sb-nav-link-icon {
  font-size: 0.9rem;
}
.sb-sidenav .sb-sidenav-menu .nav .nav-link .sb-sidenav-collapse-arrow {
  display: inline-block;
  margin-left: auto;
  transition: transform 0.15s ease;
}
.sb-sidenav
  .sb-sidenav-menu
  .nav
  .nav-link.collapsed
  .sb-sidenav-collapse-arrow {
  transform: rotate(-90deg);
}
.sb-sidenav .sb-sidenav-menu .nav .sb-sidenav-menu-nested {
  margin-left: 1.5rem;
  flex-direction: column;
}
.sb-sidenav .sb-sidenav-footer {
  padding: 0.75rem;
  flex-shrink: 0;
}

.sb-sidenav-dark {
  background-color: #212529;
  color: rgba(255, 255, 255, 0.5);
}
.sb-sidenav-dark .sb-sidenav-menu .sb-sidenav-menu-heading {
  color: rgba(255, 255, 255, 0.25);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link {
  color: rgba(255, 255, 255, 0.5);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link .sb-nav-link-icon {
  color: rgba(255, 255, 255, 0.25);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link .sb-sidenav-collapse-arrow {
  color: rgba(255, 255, 255, 0.25);
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link:hover {
  color: #fff;
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link.active {
  color: #fff;
}
.sb-sidenav-dark .sb-sidenav-menu .nav-link.active .sb-nav-link-icon {
  color: #fff;
}
.sb-sidenav-dark .sb-sidenav-footer {
  background-color: #343a40;
}
</style>
