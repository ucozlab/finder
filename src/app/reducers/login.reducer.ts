import { ActionReducer, Action } from '@ngrx/store';
import { LoginFormComponent } from '../components/login/login-form-component';

export const LoginReducer: ActionReducer<any> = (state: {}, action: Action) => {
    switch (action.type) {
         case LoginFormComponent.StoreEvents.login:
             return Object.assign({}, state, {
                 isLoggedIn: action.payload.isLoggedIn
             });
        default:
            return state;
    }
};
