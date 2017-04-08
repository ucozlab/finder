import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form-template.html'
})

export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    fliptext: string;
    flipsecondary: string;
    shakeForm: boolean = false;

    constructor (
        private fb: FormBuilder,
        private store: Store<any>,
        private authService: AuthService
    ){
        this.fliptext = 'Create an account';
        this.flipsecondary = "Don’t have an account yet ?";
        this.loginForm = this.fb.group({
            login_name: ['', Validators.required],
            login_password: ['', Validators.required]
        });
        this.registerForm = this.fb.group({
            register_name: ['', Validators.required],
            register_password: ['', Validators.required]
        });
    }

    login() {
        this.authService.logUserIn(this.loginForm);
    }

    register() {
        console.log('login');
    }

    flipCard(text: string) {
        switch (text) {
            case 'Create an account':
                this.fliptext = "Sign In";
                this.flipsecondary = "Already have an account?";
                break;
            case 'Sign In':
                this.fliptext = "Create an account";
                this.flipsecondary = "Don’t have an account yet ?";
                break;
            default:
                this.fliptext = "Create an account";
                this.flipsecondary = "Don’t have an account yet ?";
                break;
        }
    }

    ngOnInit(): void {
        this.store.select<any>('loginState').subscribe((state) => {
            state && (this.shakeForm = state.shakeForm);
        });
    }
}