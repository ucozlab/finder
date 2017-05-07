import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import ACTIONTYPES from "../../actions/types";

@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar-template.html',
})

export class ProgressBarComponent {

    status: boolean = false;
    width: number = 0;
    text: string = '';

    constructor(
        private store: Store<any>,
    ) {}

    ngOnInit() {

        //subscribe to search input changes
        this.store.select<any>('progressBarState').subscribe((state: any) => {

            if (state) {

                this.status = state.progressBarStatus;
                this.width  = this.width + 33;
                this.text   = state.progressBarText;

                if (this.width > 90) {
                    setTimeout (() => {
                        this.status = false;
                        this.width  = 0;
                        this.text   = '';
                    }, 500)
                }
            }
        });

    }
}