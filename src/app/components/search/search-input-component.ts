import {Observable} from 'rxjs/Rx';
import {ElementRef, OnInit, Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {CurrentSearch} from "../../models/current-search.model";
import ACTIONTYPES from '../../actions/types';

@Component({
    selector: 'search-input',
    template: `<input type="text" class="form-control search-input" placeholder="Search..." autofocus>`
})

export class SearchInputComponent implements OnInit {

    constructor(
        private el: ElementRef,
        private store: Store<any>
    ) {}

    ngOnInit(): void {
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value)
            .debounceTime(500)
            .subscribe((text: string) =>
                this.store.dispatch({
                    type: ACTIONTYPES.searchtext,
                    payload: {
                        text: text
                    }
                })
            );
        this.store.select<CurrentSearch>('currentSearch').subscribe((state: CurrentSearch) => {

        });
    }

}