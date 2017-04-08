import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'page-aside',
    templateUrl: 'aside-template.html'
})

export class AsideComponent implements OnInit {

    constructor(
        private authService: AuthService
    ) {}

    logout() {
        this.authService.logUserOut();
    }

    ngOnInit() {

    }
}