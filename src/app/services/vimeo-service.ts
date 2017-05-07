import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AllResults} from '../models/search-result.model';
import {CurrentSearch} from '../models/current-search.model';
import {Store} from "@ngrx/store";
import ACTIONTYPES from "../actions/types";

const VIMEO_API_URL         = '/vimeo.php';
const VIMEO_APP_ID          = '101369';

@Injectable()
export class VimeoService {

    searchResults: BehaviorSubject<AllResults> = new BehaviorSubject<AllResults>({
        availableResults: 0,
        searchResults: []
    });

    constructor(
        private http: Http,
        private store: Store<any>
    ) {}

    search(query: CurrentSearch): Observable<AllResults>  {

        const params = [
            `query=${query.name}`,
            `per_page=100`
        ];

        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(VIMEO_API_URL, params.join('&'), {headers: headers})
            .map((response:any) => {
                const allResults = {
                    availableResults: 0,
                    searchResults: response.json().body.data.map((item:any) => {
                        return {
                            id: item.link.split('https://vimeo.com/')[1],
                            kind: 'vimeo',
                            title: item.name,
                            description: item.description,
                            thumbnailUrl: item.pictures && item.pictures.sizes && item.pictures.sizes["0"] && item.pictures.sizes["0"].link
                        };
                    })
                };
                console.log('Vimeoresult->', allResults.searchResults);
                return allResults;
            })
            .subscribe((allResults: AllResults) => {
                this.store.dispatch({
                    type: ACTIONTYPES.progressBar,
                    payload: {
                        progressBarStatus: true,
                        progressBarText: 'vimeo results loaded'
                    }
                });
                return this.searchResults.next(allResults);
            });

        return this.searchResults;
    }

}
