import {sharedAuthService} from "../services/auth-service";

export function loggedOutGuard(to, from, next) {
    if (!sharedAuthService.isLoggedIn()) {
        next();
    } else {
        next({ name: 'dashboard' });
    }
}

