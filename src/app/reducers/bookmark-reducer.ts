import { ActionReducer, Action } from '@ngrx/store';
import ACTIONTYPES from "../actions/types";

export const BookmarkReducer: ActionReducer<any> = (state: {}, action: Action) => {
    switch (action.type) {
        case ACTIONTYPES.isInBookmark:
            return Object.assign({}, state, {
                isInBookmark: action.payload.isInBookmark
            });
        default:
            return state;
    }
};
