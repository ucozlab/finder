import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'login-page',
    templateUrl: 'login-page-template.html'
})

export class LoginPageComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;

    constructor (
        private fb: FormBuilder
    ){}

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
        console.log('login');
    }

    register() {
        console.log('login');
    }

    ngOnInit(): void {
        this.createRegisterForm();
        this.createLoginForm();
    }
}