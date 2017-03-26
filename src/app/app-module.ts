import { NgModule }            from "@angular/core";
import { BrowserModule }       from "@angular/platform-browser";
import { HttpModule }          from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule }    from './app-routing-module';

import { AppComponent }        from "./app-component";
import { LoginPageComponent }  from "./login/login-page-component";
import { SearchPageComponent }  from "./search/search-page-component";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        LoginPageComponent,
        SearchPageComponent
    ],
    providers: [

    ],
    bootstrap:    [
        AppComponent
    ]
})

export default class AppModule { }