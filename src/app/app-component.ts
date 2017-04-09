import { Component, Input } from "@angular/core";
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth-service';
import { Router } from "@angular/router";

@Component({
    selector: 'finder-app',
    templateUrl: 'app-component-template.html'
})

export class AppComponent {

    isLoggedIn: boolean = false;
    router: Router;

    constructor (
        private _router: Router,
        private store: Store<any>,
        private authService: AuthService
    ) {
        this.router = _router;
    }

    ngOnInit(): void {

        this.isLoggedIn = this.authService.isLoggedIn();

        this.isLoggedIn ? this.router.navigate(['/search']) : this.router.navigate(['/login']);

        this.store.select('loginState').subscribe((state: any) => {
            state && (this.isLoggedIn = state.isLoggedIn);
            state && state.isLoggedIn && this.router.navigate(['/search']);
            state && !state.isLoggedIn && this.router.navigate(['/login']);
        });

    }

}