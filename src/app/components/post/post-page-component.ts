import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Params} from "@angular/router";
import {Post} from "../../models/search-result.model";
import {YouTubeService} from "../../services/youtube.service";

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

    constructor(
        private store: Store<any>,
        private youtube: YouTubeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {

        this.route.params.subscribe((params:Params) => {
            switch (params.kind) {
                case 'youtube':
                    this.youtube.getVideoById(params.id);
                case 'twitter':
                    // this.youtube.getvideo();
                case 'vimeo':
                    // this.youtube.getvideo();
            }
        });

        this.store.select<any>('currentSearch').subscribe((state: any) => {

            if (state && state.post && (state.post.kind === 'youtube#videoListResponse')) {
                this.post.title = state.post.items[0].snippet.title;
                this.post.kind = 'youtube';
                this.post.description = state.post.items[0].snippet.description || 'No description';
                this.post.id = state.post.items[0].id;
                this.youtubeVideoId = `http://www.youtube.com/embed/${state.post.items[0].id}`;
            }

        });

    }

}