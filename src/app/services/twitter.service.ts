import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from 'moment';
import {CurrentSearch} from "../models/current-search.model";

const CONSUMER_KEY = '3nnMcXVV5JIGanoGTJtTiSKyb';
const CONSUMER_SECRET = 'WPcdzaXvT6sQxW9JhHTOT0MJXb0gv5WlrN5FgTGRsqD0xIJDQz';
const ENCODE_SECRET = new Buffer(CONSUMER_KEY + ':' + CONSUMER_SECRET).toString('base64');

@Injectable()
export class TwitterService {

	searchquery = '';
	searchResults: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(private http: Http){}

	searchcall(searchquery: CurrentSearch) {
		var headers = new Headers();
		var searchterm = 'query=' + searchquery.name;

		headers.append('Content-Type', 'application/X-www-form-urlencoded');

		return this.http.post('/twitter.php', searchterm, {headers: headers})
			.map((res) => {
				const result = res.json().statuses.map((item:any) => {
					return {
						id: item.id,
						kind: 'twitter',
						title: item.text,
						description: `${item.user.name} @ ${moment(item.user.created_at).format("MMM Do YYYY")}`,
						thumbnailUrl: item.entities.media && item.entities.media["0"] && item.entities.media["0"].media_url
					};
				});

				console.log('TWresult->', result);
				return result;
			})
			.subscribe((results) => this.searchResults.next(results));
	}

	// usercall(){
	// 	var headers = new Headers();
	// 	var searchterm = 'screenname=Yasmin_Payne1';
    //
	// 	headers.append('Content-Type', 'application/X-www-form-urlencoded');
    //
	// 	this.http.post('/twitter.php', searchterm, {headers: headers}).subscribe((res) => {
	// 		console.log(res.json().data);
    //
	// 	});
	// }

}
