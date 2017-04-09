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
    private users = [
            {
                "id": 0,
                "login": "Artem",
                "password": "123"
            },
            {
                "id": 1,
                "login": "Jack",
                "password": "213"
            },
            {
                "id": 2,
                "login": "Martin",
                "password": "123"
            },
            {
                "id": 3,
                "login": "test",
                "password": "123"
            }
        ];

    constructor(
        private store: Store<any>,
        private http: Http
    ) {
        !this.checkLocalStorage() && alert('Sorry, yor browser doesn\'t support localstorage :( Please try another(e.g. Chrome)');
        !localStorage.getItem('users') && localStorage.setItem('users', JSON.stringify(this.users));
    }

    checkLocalStorage () {
        return ('localStorage' in window && window['localStorage'] !== null);
    }

    canActivate() {
        console.log('AuthGuard#canActivate called');
        return true;
    }

    logUserIn(data:any) {
        // return this.http
        //     // .post(this.authUrl, JSON.stringify({name: name}), {headers: this.headers})
        //     .get('./users.json')
        //     .toPromise()
        //     .then(response => {
        //
        //         const loginPresent = _.filter(response.json(), {
        //             login: data.controls.login_name._value,
        //             password: data.controls.login_password._value
        //         }).length > 0;
        //
        //         this.store.dispatch({
        //             type: ACTIONTYPES.login,
        //             payload: {
        //                 isLoggedIn : loginPresent
        //                 //data: somedata
        //             }
        //         });
        //         // localStorage.setItem('loggedInDb', 'true');
        //         console.log('response->', response.json());
        //     })
        //     .catch(this.handleError);

        const userPresent = _.filter(JSON.parse(localStorage.getItem('users')), {
                login: data.controls.login_name._value,
                password: data.controls.login_password._value
        }).length > 0;

        if (!userPresent) {
            this.store.dispatch({
                type: ACTIONTYPES.shake,
                payload: {
                    shakeForm : true
                }
            });
            setTimeout(() => {
                this.store.dispatch({
                    type: ACTIONTYPES.shake,
                    payload: {
                        shakeForm : false
                    }
                });
            }, 1000);
        }
        else {
            localStorage.setItem("isLoggedSession", "true");
            this.store.dispatch({
                type: ACTIONTYPES.login,
                payload: {
                    isLoggedIn : true
                }
            });
        }
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
        localStorage.setItem("isLoggedSession", "false");
        this.store.dispatch({
            type: ACTIONTYPES.login,
            payload: {
                isLoggedIn : false
            }
        });
    }

    registerUser(data:any): boolean {
        const
            login = data.controls.register_name._value,
            password = data.controls.register_password._value;

        if (!login || !password) {
            this.store.dispatch({
                type: ACTIONTYPES.shake,
                payload: {
                    shakeForm : true
                }
            });
            setTimeout(() => {
                this.store.dispatch({
                    type: ACTIONTYPES.shake,
                    payload: {
                        shakeForm : false
                    }
                });
            }, 1000);
            return false;
        } else {
            const newUsers = JSON.parse(localStorage.getItem('users'));
            newUsers.push({
                login,
                password
            });
            localStorage.setItem('users', JSON.stringify(newUsers));
            return true;
        }
    }

    isLoggedIn() {
        return JSON.parse(localStorage.getItem('isLoggedSession'));
    }

    addUserSearch(query:string) {
        // const newUsers = JSON.parse(localStorage.getItem('users'));
        // newUsers.push({
        //     login,
        //     password
        // });
        // localStorage.setItem('users', JSON.stringify(newUsers));
        return JSON.parse(localStorage.getItem('isLoggedSession'));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}