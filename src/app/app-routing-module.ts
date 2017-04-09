import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { LoginPageComponent }     from './components/login/login-page-component';
import { SearchPageComponent }    from "./components/search/search-page-component";
import { PostPageComponent }      from "./components/post/post-page-component";
import { BookmarksPageComponent } from "./components/bookmarks/bookmarks-page-component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginPageComponent },
    { path: 'search',  component: SearchPageComponent },
    { path: 'bookmarks',  component: BookmarksPageComponent },
    { path: 'post/:kind/:id', component: PostPageComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}