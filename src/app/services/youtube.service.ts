import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AllResults} from '../models/search-result.model';
import {CurrentSearch} from '../models/current-search.model';
import {Store} from "@ngrx/store";
import ACTIONTYPES from "../actions/types";

const YOUTUBE_API_KEY = 'AIzaSyBUU9hIIs9S0Qo2d7cgoxxoPyh2iEbH5z0';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const LOCATION_TEMPLATE = 'location={latitude},{longitude}&locationRadius={radius}km';


@Injectable()
export class YouTubeService {

    searchResults: BehaviorSubject<AllResults> = new BehaviorSubject<AllResults>({
        availableResults: 0,
        searchResults: []
    });

    searchResult: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor(
        private http: Http,
        private store: Store<any>
    ) {}
    
    search(query: CurrentSearch): Observable<AllResults>  {
        let params = [
            `q=${query.name}`,
            `key=${YOUTUBE_API_KEY}`,
            `part=snippet`,
            `type=video`,
            `maxResults=50`
        ];
        
        if (query.location) {
            const radius = query.radius ? query.radius : 50;
            const location =
                LOCATION_TEMPLATE
                    .replace(/\{latitude\}/g, query.location.latitude.toString())
                    .replace(/\{longitude\}/g, query.location.longitude.toString())
                    .replace(/\{radius\}/g, radius.toString());
            params.push(location);
        }
        
        const queryUrl: string = `${YOUTUBE_API_URL}?${params.join('&')}`;

        this.http.get(queryUrl)
            .map((response:any) => {
                const result = response.json();
                const allResults = {
                    availableResults: result.pageInfo.totalResults,
                    searchResults: result.items.map((item:any) => {
                        return {
                            id: item.id.videoId,
                            kind: "youtube",
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnailUrl: item.snippet.thumbnails.high.url
                        };
                    })
                };
                console.log(result);
                return allResults;
            })
            .subscribe((results: AllResults) => {
                this.store.dispatch({
                    type: ACTIONTYPES.progressBar,
                    payload: {
                        progressBarStatus: true,
                        progressBarText: 'youtube results loaded'
                    }
                });
                return this.searchResults.next(results);
            });

        return this.searchResults;
    }

    getVideoById(id:string) {

        const queryUrl: string = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`;
        this.http.get(queryUrl)
            .map((response:any) => response.json())
            .subscribe((result) => {
                this.store.dispatch({
                    type: ACTIONTYPES.post,
                    payload: {
                        postLoaded: result,
                        postType: 'youtube'
                    }
                })
            });

        // return this.searchResults;
    }

}
