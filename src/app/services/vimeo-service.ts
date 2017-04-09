import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AllResults} from '../models/search-result.model';
import {CurrentSearch} from '../models/current-search.model';

const VIMEO_API_URL         = '/vimeo.php';
const VIMEO_APP_ID          = '101369';

@Injectable()
export class VimeoService {

    searchResults: BehaviorSubject<AllResults> = new BehaviorSubject<AllResults>({
        availableResults: 0,
        searchResults: []
    });

    constructor( private http: Http ) {}

    search(query: CurrentSearch): Observable<AllResults>  {

        const params = [
            `query=${query.name}`,
            `per_page=100`
        ];

        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(VIMEO_API_URL, params.join('&'), {headers: headers})
            .map((response:any) => {
                const result = response;
                // const allResults = {
                //     availableResults: result.pageInfo.totalResults,
                //     searchResults: result.items.map((item:any) => {
                //         return {
                //             id: item.id.videoId,
                //             kind: "youtube",
                //             title: item.snippet.title,
                //             description: item.snippet.description,
                //             thumbnailUrl: item.snippet.thumbnails.high.url
                //         };
                //     })
                // };
                console.log('Vimeoresult->', result);
                return result;
            })
            .subscribe((results: AllResults) => this.searchResults.next(results));

        return this.searchResults;
    }

}
