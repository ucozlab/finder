import { NgModule }             from "@angular/core";
import { BrowserModule }        from "@angular/platform-browser";
import { HttpModule }           from '@angular/http';
import { ReactiveFormsModule }  from '@angular/forms';
import { Store, StoreModule}    from "@ngrx/store";

import { AppRoutingModule }     from './app-routing-module';

import { AppComponent }         from "./app-component";
import { LoginPageComponent }   from "./components/login/login-page-component";
import { SearchPageComponent }  from "./components/search/search-page-component";
import { SearchInputComponent } from "./components/search/search-input-component";
import { LoginFormComponent }   from "./components/login/login-form-component";
import { AsideComponent }       from "./components/aside/aside-component";

import { SearchReducer }        from "./reducers/search.reducer";
import { LoginReducer }         from "./reducers/login.reducer";

import { YouTubeService }       from "./services/youtube.service";
import { PagerService }         from "./services/pagination";
import { AuthService }          from "./services/auth-service";

const storeManager = StoreModule.provideStore({
    currentSearch: SearchReducer,
    loginState: LoginReducer
});

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        StoreModule,
        storeManager
    ],
    declarations: [
        AppComponent,
        LoginPageComponent,
        SearchPageComponent,
        SearchInputComponent,
        LoginFormComponent,
        AsideComponent,
    ],
    providers: [
        YouTubeService,
        PagerService,
        AuthService
    ],
    bootstrap:    [
        AppComponent
    ]
})

export default class AppModule { }