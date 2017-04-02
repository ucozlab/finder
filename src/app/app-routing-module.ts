import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent }   from './components/login/login-page-component';
import { SearchPageComponent }  from "./components/search/search-page-component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginPageComponent },
    { path: 'search',  component: SearchPageComponent },
    { path: 'post/:id', component: SearchPageComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}