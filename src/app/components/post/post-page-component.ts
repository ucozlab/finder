import * as moment from 'moment';
import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../../models/search-result.model";
import {YouTubeService} from "../../services/youtube.service";
import {AuthService} from "../../services/auth-service";
import {TwitterService} from "../../services/twitter.service";
import {VimeoService} from "../../services/vimeo-service";

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
    vimeoVideo: string = '';
    private subscription;
    private subscription2;
    private subscription3;

    constructor(
        private store: Store<any>,
        private youtube: YouTubeService,
        private twitter: TwitterService,
        private vimeo: VimeoService,
        private route: ActivatedRoute,
        private auth: AuthService
    ) {}

    bookmark() {
        this.isInBookmark ? this.auth.removeFromBookMark(this.post) : this.auth.addtoBookMark(this.post);
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe((params:Params) => {
            switch (params.kind) {
                case 'youtube':
                    this.youtube.getVideoById(params.id);
                    break;
                case 'twitter':
                    this.twitter.getPostById(params.id);
                    break;
                case 'vimeo':
                    this.vimeo.getVideoById(params.id);
                    break;
            }
        });

        this.subscription2 = this.store
            .select('currentSearch')
            .subscribe((state: any) => {
                if (state && state.post && (state.postType == 'youtube')) {
                    this.post.title = state.post.items[0].snippet.title;
                    this.post.kind = 'youtube';
                    this.post.description = state.post.items[0].snippet.description || 'No description';
                    this.post.id = state.post.items[0].id;
                    this.youtubeVideoId = `http://www.youtube.com/embed/${state.post.items[0].id}`;
                    this.tweet = '';
                    this.vimeoVideo = '';
                } else if (state && state.post && (state.postType == 'twitter')) {
                    this.post.title = `${state.post.user.name} @ ${moment(state.post.created_at).format("MMM Do YYYY")}`;
                    this.post.kind = 'twitter';
                    this.tweet = state.post.text || 'No description';
                    this.post.id = state.post.id_str;
                    this.youtubeVideoId = '';
                    this.vimeoVideo = ''
                } else if (state && state.post && (state.postType == 'vimeo')) {
                    this.post.title = state.post.body.name;
                    this.post.kind = 'vimeo';
                    this.post.id = state.post.body && state.post.body.link && state.post.body.link.split('https://vimeo.com/')[1];
                    this.vimeoVideo = state.post.body && state.post.body.link && `https://player.vimeo.com/video/${state.post.body.link.split('https://vimeo.com/')[1]}`;
                    this.post.description = state.post.body.description;
                    this.youtubeVideoId = '';
                    this.tweet = '';
                }
                this.auth.isInBookMark(this.post);
            });

        this.subscription3 = this.store
            .select<any>('bookmarkState')
            .subscribe((state: any) => {
                state && (this.isInBookmark = state.isInBookmark);
            });

        this.auth.isInBookMark(this.post);

    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
        this.subscription3.unsubscribe();
    }

}