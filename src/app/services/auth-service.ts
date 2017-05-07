import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Headers, Http } from "@angular/http";
import { Store } from "@ngrx/store";
import * as _ from 'lodash';

import ACTIONTYPES from "../actions/types";
import { User } from "../models/user-model";
import {Post} from "../models/search-result.model";

@Injectable()
export class AuthService implements CanActivate {

    private authUrl = 'api/users';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    private users = [
            {
                "id": 0,
                "login": "Artem",
                "password": "123",
                "bookmarks": []
            },
            {
                "id": 1,
                "login": "Jack",
                "password": "213",
                "bookmarks": []
            },
            {
                "id": 2,
                "login": "Martin",
                "password": "123",
                "bookmarks": []
            },
            {
                "id": 3,
                "login": "test",
                "password": "123",
                "bookmarks": []
            }
        ];

    constructor(
        private store: Store<any>,
        private http: Http
    ) {
        !this.checkLocalStorage() && alert('Sorry, yor browser doesn\'t support localstorage :( Please try another(e.g. Chrome)');
        !localStorage.getItem('users') && localStorage.setItem('users', JSON.stringify(this.users));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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
            localStorage.setItem("isLoggedSession", JSON.stringify({
                login: data.controls.login_name._value,
                password: data.controls.login_password._value
            }));
            this.store.dispatch({
                type: ACTIONTYPES.login,
                payload: {
                    isLoggedIn : {
                        login: data.controls.login_name._value,
                        password: data.controls.login_password._value
                    }
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
        this.store.dispatch({
            type: ACTIONTYPES.login,
            payload: {
                isLoggedIn : JSON.parse(localStorage.getItem('isLoggedSession'))
            }
        });
    }

    addUserSearch(query:string) {
        // const
        //     users       = JSON.parse(localStorage.getItem('users')),
        //     currentUser = JSON.parse(localStorage.getItem('isLoggedSession'));
        //
        // _.forEach(users, function(user:User, index:number) {
        //     if ((user.login == currentUser.login) && (user.password == currentUser.password)) {
        //         users[index].bookmarks.push(word);
        //     }
        // });
        //
        // localStorage.setItem('users', JSON.stringify(users));
    }

    addtoBookMark(post:Post) {
        const
            users       = JSON.parse(localStorage.getItem('users')),
            currentUser = JSON.parse(localStorage.getItem('isLoggedSession'));

        _.forEach(users, function(user:User, index:number) {
            if ((user.login == currentUser.login) && (user.password == currentUser.password)) {
                !(_.filter(users[index].bookmarks, {id : post.id}).length > 0) && users[index].bookmarks.push(post);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));

        this.store.dispatch({
            type: ACTIONTYPES.isInBookmark,
            payload: {
                isInBookmark : true
            }
        });

    }

    removeFromBookMark(post:Post) {
        const
            users       = JSON.parse(localStorage.getItem('users')),
            currentUser = JSON.parse(localStorage.getItem('isLoggedSession'));

        _.forEach(users, function(user:User, index:number) {
            if ((user.login == currentUser.login) &&(user.password == currentUser.password)) {
                _.remove(users[index].bookmarks, {id : post.id});
            }
        });

        localStorage.setItem('users', JSON.stringify(users));

        this.store.dispatch({
            type: ACTIONTYPES.isInBookmark,
            payload: {
                isInBookmark : false
            }
        });

    }

    getBookMarks():Post[] {
        let
            users       = JSON.parse(localStorage.getItem('users')),
            currentUser = JSON.parse(localStorage.getItem('isLoggedSession')),
            bookmarks:Post[] = [];

        _.forEach(users, function(user:User, index:number) {
            if ((user.login == currentUser.login) && (user.password == currentUser.password)) {
                bookmarks = users[index].bookmarks;
            }
        });

        return bookmarks;
    }

    isInBookMark(post:Post) {

        const bookmarks = this.getBookMarks();

        if (_.filter(bookmarks, {id : post.id}).length > 0) {
            this.store.dispatch({
                type: ACTIONTYPES.isInBookmark,
                payload: {
                    isInBookmark : true
                }
            });
        }
    }

}