import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'page-aside',
    templateUrl: 'aside-template.html'
})

export class AsideComponent implements OnInit {

    router: Router;

    constructor(
        private store: Store<any>,
        private _router: Router,
        private authService: AuthService
    ) {
        this.router = _router;
    }

    logout() {
        this.authService.logUserOut();
    }

    ngOnInit() {
        this.store.select<any>('loginState').subscribe((state) => {
            state && state.isLoggedIn && this.router.navigate(['/login']);
        });
    }
}