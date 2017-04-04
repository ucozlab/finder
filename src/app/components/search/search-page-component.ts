import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import { FormsModule } from '@angular/forms';

import {CurrentSearch} from "../../models/current-search.model";
import {AllResults, SearchResult} from "../../models/search-result.model";
import {YouTubeService} from "../../services/youtube.service";
import {PagerService} from "../../services/pagination";
import {TwitterService} from "../../services/twitter.service";

@Component({
    selector: 'search-page',
    templateUrl: 'search-page-template.html',
    providers: [TwitterService]
})

export class SearchPageComponent {

    private state: CurrentSearch;
    private currentSearch: Observable<CurrentSearch>;
    private searchResults: SearchResult[] = [];
    private availableResults: number = 0;
    private disableSearch = false;
    private errorEmptySearch = true;
    private errorLocation = false;
    private errorLocationMessage = '';
    private tweetsData: any;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(
        private store: Store<CurrentSearch>,
        private youtube: YouTubeService,
        private pagerService: PagerService,
        private twitter: TwitterService
    ) {
        this.currentSearch = this.store.select<CurrentSearch>('currentSearch');
        this.youtube.searchResults.subscribe((results: AllResults) => {
            this.availableResults = results.availableResults;
            this.searchResults = results.searchResults;
            this.setPage(1);
        });
        this.twitter.searchResults.subscribe((results) => this.tweetsData = results);
    }
    searchcall(searchquery: string):void {
        this.twitter.searchcall(searchquery);
    }
    ngOnInit() {
        this.currentSearch.subscribe((state: CurrentSearch) => {
            this.state = state;

            if (state && state.name && state.name.length > 0) {
                this.disableSearch = false;
                this.errorEmptySearch = false;
                this.youtube.search(state);
            } else {
                this.disableSearch = true;
                this.errorEmptySearch = true;
                this.searchResults = [];
                this.availableResults = 0;
            }
            if (state && state.error) {
                this.errorLocation = true;
                this.errorLocationMessage = state.error;
            } else {
                this.errorLocation = false;
            }
        });
    }

    setPage(page: number) {

        // if (page < 1 || page > this.pager.totalPages) {
        //      return;
        // }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.searchResults.length, page);

        // get current page of items
        this.pagedItems = this.searchResults.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}