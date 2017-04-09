import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AllResults} from '../models/search-result.model';
import {CurrentSearch} from '../models/current-search.model';

const VIMEO_CLIENT_KEY      = 'd2dc82abc8a130f15121b249d6f5727eb540315b';
const VIMEO_CLIENT_SECRETS  = 'xqiXDg9LTR42ldcJi3Dfwht+vdVZhymmAG8IRxgvEdwxMrq5lPq/KbiC14teIyZ//51S0S1S6xv2+QfiTrAaiTL1GYVJK8rZT+M6JkNRjam/VwY+mFuHuMtMOsNIfNcB';
const VIMEO_AUTH_URL        = 'https://api.vimeo.com/oauth/authorize';
const VIMEO_TOKEN_URL       = 'https://api.vimeo.com/oauth/access_token';
const VIMEO_API_URL         = 'https://api.vimeo.com/videos';
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
        headers.append('Authorization', `basic " + ${VIMEO_CLIENT_KEY + ":" + VIMEO_CLIENT_SECRETS}`);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const queryUrl: string = `${VIMEO_API_URL}?${params.join('&')}`;

        this.http.get(queryUrl, headers)
            .map((response:any) => {
                const result = response.json();
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
