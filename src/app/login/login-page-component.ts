import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'login-page',
    templateUrl: 'login-page-template.html'
})

export class LoginPageComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    router: Router;

    constructor (
        private _router: Router,
        private fb: FormBuilder
    ){
        this.router = _router;
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
            login_name: ['', Validators.required],
            login_password: ['', Validators.required]
        })
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            register_name: ['', Validators.required],
            register_password: ['', Validators.required]
        })
    }

    login() {
        // this.authService.logUserIn(this.model).then((success) => {
        //
        //     //This is where its broke - below:
        //     this.router.parent.navigate('/about');
        //
        // });
        this.router.navigate(['/search']);
    }

    register() {
        console.log('login');
    }

    ngOnInit(): void {
        this.createRegisterForm();
        this.createLoginForm();
    }
}