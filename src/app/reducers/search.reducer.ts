import { ActionReducer, Action } from '@ngrx/store';
import { SearchInputComponent } from '../components/search/search-input-component';
import { CurrentSearch } from "../models/current-search.model";

export const SearchReducer: ActionReducer<CurrentSearch> = (state: CurrentSearch, action: Action) => {
    switch (action.type) {
         case SearchInputComponent.StoreEvents.text:
             return Object.assign({}, state, {
                 name: action.payload.text
             });
        default:
            return state;
    }
};
