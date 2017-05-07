import { ActionReducer, Action } from '@ngrx/store';
import ACTIONTYPES from "../actions/types";

export const ProgressBarReducer: ActionReducer<any> = (state: {}, action: Action) => {
    switch (action.type) {
        case ACTIONTYPES.progressBar:
            return Object.assign({}, state, {
                progressBarStatus: action.payload.progressBarStatus,
                progressBarText: action.payload.progressBarText
            });
        default:
            return state;
    }
};
