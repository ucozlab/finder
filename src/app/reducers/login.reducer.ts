import { ActionReducer, Action } from '@ngrx/store';
import { LoginPageComponent } from '../components/login/login-page-component';

export const LoginReducer: ActionReducer<any> = (state: {}, action: Action) => {
    switch (action.type) {
         case LoginPageComponent.StoreEvents.login:
             console.log('hello reducer');
             return Object.assign({}, state, {
                 isLoggedIn: action.payload.isLoggedIn
             });
        default:
            return state;
    }
};
