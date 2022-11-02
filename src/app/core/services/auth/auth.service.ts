import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated: boolean = false;
    constructor(
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        if (localStorage.getItem('LoginData')) {
            this.isAuthenticated = true;
        }
        if (!this.isAuthenticated) {
            this.router.navigate(['']);
        }
        return this.isAuthenticated;
    }
}
