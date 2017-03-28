import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {CurrentSearch} from "../../models/current-search.model";
import {SearchResult} from "../../models/search-result.model";
import {YouTubeService} from "../../services/youtube.service";

@Component({
    selector: 'search-page',
    templateUrl: 'search-page-template.html'
})

export class SearchPageComponent {

    private state: CurrentSearch;
    private currentSearch: Observable<CurrentSearch>;
    private searchResults: SearchResult[] = [];
    private disableSearch = false;
    private errorEmptySearch = true;
    private errorLocation = false;
    private errorLocationMessage = '';

    constructor(
        private store: Store<CurrentSearch>,
        private youtube: YouTubeService
    ) {
        this.currentSearch = this.store.select<CurrentSearch>('currentSearch');
        this.youtube.searchResults.subscribe((results: SearchResult[]) => this.searchResults = results);
    }

    ngOnInit() {
        this.currentSearch.subscribe((state: CurrentSearch) => {
            this.state = state;
            console.log('state', state);
            if (state && state.name && state.name.length > 0) {
                this.disableSearch = false;
                this.errorEmptySearch = false;
                this.youtube.search(state)
            } else {
                this.disableSearch = true;
                this.errorEmptySearch = true;
                this.searchResults = [];
            }
            if (state && state.error) {
                this.errorLocation = true;
                this.errorLocationMessage = state.error;
            } else {
                this.errorLocation = false;
            }
        });
    }

}