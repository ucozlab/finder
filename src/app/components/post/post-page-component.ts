import * as moment from 'moment';
import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../../models/search-result.model";
import {YouTubeService} from "../../services/youtube.service";
import {AuthService} from "../../services/auth-service";
import {TwitterService} from "../../services/twitter.service";

@Component({
    selector: 'post-page',
    templateUrl: 'post-page-template.html',
})

export class PostPageComponent {

    post: Post = {
        id: '',
        title: '',
        description: '',
        kind: ''
    };
    youtubeVideoId: string = '';
    tweet: any;
    isInBookmark: boolean = false;

    constructor(
        private store: Store<any>,
        private youtube: YouTubeService,
        private twitter: TwitterService,
        private route: ActivatedRoute,
        private auth: AuthService
    ) {}

    bookmark() {
        this.isInBookmark ? this.auth.removeFromBookMark(this.post) : this.auth.addtoBookMark(this.post);
    }

    ngOnInit() {

        this.route.params.subscribe((params:Params) => {
            switch (params.kind) {
                case 'youtube':
                    this.youtube.getVideoById(params.id);
                case 'twitter':
                    this.twitter.getPostById(params.id);
                case 'vimeo':
                    // this.youtube.getvideo();
            }
        });

        this.store.select<any>('currentSearch').subscribe((state: any) => {

            if (state && state.post && (state.postType === 'youtube')) {
                this.post.title = state.post.items[0].snippet.title;
                this.post.kind = 'youtube';
                this.post.description = state.post.items[0].snippet.description || 'No description';
                this.post.id = state.post.items[0].id;
                this.youtubeVideoId = `http://www.youtube.com/embed/${state.post.items[0].id}`;
                this.auth.isInBookMark(this.post);
            } else if (state && state.post && (state.postType === 'twitter')) {
                this.post.title = `${state.post.user.name} @ ${moment(state.post.created_at).format("MMM Do YYYY")}`;
                this.post.kind = 'twitter';
                this.tweet = state.post.text || 'No description';
                this.post.id = state.post.id_str;
                this.auth.isInBookMark(this.post);
            }

        });

        this.store.select<any>('bookmarkState').subscribe((state: any) => {
            console.log('bstate', state);
            state && (this.isInBookmark = state.isInBookmark);
        });

    }

}