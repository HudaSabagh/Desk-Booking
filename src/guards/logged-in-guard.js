import { sharedAuthService } from "../services/auth-service";

export function loggedInGuard(to, from, next) {
  if (sharedAuthService.isLoggedIn()) {
    next(); // allow to enter route
  } else {
    next({ name: "login" }); // go to '/login'
  } //function to check if the user is authenticated.
}
