import { Component, Input } from "@angular/core";
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth-service';
import { Router, ActivatedRoute } from "@angular/router";

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
        private authService: AuthService,
        private activeRoute: ActivatedRoute
    ) {
        this.router = _router;
    }

    ngOnInit(): void {

        this.authService.isLoggedIn();

        // console.log('this.router.url', this.router.url);
        //
        // this.isLoggedIn && (this.router.url === '/') && this.router.navigate(['/search']);

        this.store.select('loginState').subscribe((state: any) => {
            state && (this.isLoggedIn = state.isLoggedIn);
            state && !state.isLoggedIn && this.router.navigate(['/login']);
            state && state.isLoggedIn && (this.router.url === "/login") && this.router.navigate(['/search']);
        });

    }

}