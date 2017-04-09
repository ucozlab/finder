import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {Store} from "@ngrx/store";

@Component({
    selector: 'page-aside',
    templateUrl: 'aside-template.html'
})

export class AsideComponent implements OnInit {

    login: string;

    constructor(
        private store: Store<any>,
        private authService: AuthService
    ) {}

    logout() {
        this.authService.logUserOut();
    }

    ngOnInit() {
        this.store.select('loginState').subscribe((state: any) => {
            state && state.isLoggedIn && (this.login = state.isLoggedIn.login);
        });
    }
}