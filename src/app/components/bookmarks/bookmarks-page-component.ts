import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {Post} from "../../models/search-result.model";
import {PagerService} from "../../services/pagination";
import {AuthService} from "../../services/auth-service";

@Component({
    selector: 'bookmarks-page',
    templateUrl: 'bookmarks-page-template.html',
})

export class BookmarksPageComponent {

    pager: any = {};
    bookmarks: Post[];
    pagedItems: Post[];

    constructor(
        private store: Store<any>,
        private auth: AuthService,
        private pagerService: PagerService
    ) {}
    ngOnInit() {
        this.bookmarks = this.auth.getBookMarks();
        this.setPage(1);
    }

    setPage(page: number) {
        this.pager = this.pagerService.getPager(this.bookmarks.length, page);
        this.pagedItems = this.bookmarks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}