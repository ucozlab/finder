import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Headers, Http } from "@angular/http";
import { Store } from "@ngrx/store";
import * as _ from 'lodash';

import ACTIONTYPES from "../actions/types";
import { User } from "../models/user-model";

@Injectable()
export class AuthService implements CanActivate {

    private authUrl = 'api/users';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private store: Store<any>,
        private http: Http
    ) {}

    canActivate() {
        console.log('AuthGuard#canActivate called');
        return true;
    }

    logUserIn(data:any) {
        return this.http
            // .post(this.authUrl, JSON.stringify({name: name}), {headers: this.headers})
            .get('./users.json')
            .toPromise()
            .then(response => {

                const loginPresent = _.filter(response.json(), {
                    login: data.controls.login_name._value,
                    password: data.controls.login_password._value
                }).length > 0;

                this.store.dispatch({
                    type: ACTIONTYPES.login,
                    payload: {
                        isLoggedIn : loginPresent
                        //data: somedata
                    }
                });
                // localStorage.setItem('loggedInDb', 'true');
                console.log('response->', response.json());
            })
            .catch(this.handleError);
        // console.log('data->', data);
        // // temp1.controls.login_name._value
        // this.store.dispatch({
        //     type: ACTIONTYPES.login,
        //     payload: {
        //         isLoggedIn : true
        //         //data: somedata
        //     }
        // });
    }

    logUserOut() {
        // return this.http
        //     .post(this.authUrl, JSON.stringify({name: name}), {headers: this.headers})
        //     .toPromise()
        //     .then(response => {
        //         this.store.dispatch({
        //             type: ACTIONTYPES.login,
        //             payload: {
        //                 isLoggedIn : true
        //                 //data: somedata
        //             }
        //         });
        //         localStorage.setItem('loggedInDb', 'true');
        //     })
        //     .catch(this.handleError);
        // temp1.controls.login_name._value
        this.store.dispatch({
            type: ACTIONTYPES.login,
            payload: {
                isLoggedIn : false
            }
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}