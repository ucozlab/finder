import { ActionReducer, Action } from '@ngrx/store';
import ACTIONTYPES from "../actions/types";

export const LoginReducer: ActionReducer<any> = (state: {}, action: Action) => {
    switch (action.type) {
         case ACTIONTYPES.login:
             return Object.assign({}, state, {
                 isLoggedIn: action.payload.isLoggedIn
             });
        default:
            return state;
    }
};
