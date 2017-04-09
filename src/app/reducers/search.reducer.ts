import { ActionReducer, Action } from '@ngrx/store';
import { CurrentSearch } from "../models/current-search.model";
import ACTIONTYPES from "../actions/types";

export const SearchReducer: ActionReducer<CurrentSearch> = (state: CurrentSearch, action: Action) => {
    switch (action.type) {
        case ACTIONTYPES.searchtext:
             return Object.assign({}, state, {
                 name: action.payload.text
             });
        case ACTIONTYPES.post:
             return Object.assign({}, state, {
                 post: action.payload.postLoaded
             });
        default:
            return state;
    }
};
