import { ActionReducer, Action } from '@ngrx/store';
import { CurrentSearch } from "../models/current-search.model";
import ACTIONTYPES from "../actions/types";

export const SearchReducer: ActionReducer<CurrentSearch> = (state: CurrentSearch, action: Action) => {
    switch (action.type) {
         case ACTIONTYPES.searchtext:
             return Object.assign({}, state, {
                 name: action.payload.text
             });
        default:
            return state;
    }
};
