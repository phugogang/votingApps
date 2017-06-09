import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';
import {Location} from '@angular/common';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    error_Login: boolean = false;
    error_message: string;

    constructor(private router: Router, 
    private _location: Location,   
                private _appService: AppService){}

    ngOnInit() {
        this.loginForm = new FormGroup({
            "username": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required)
        })
    }


    onSubmit() {
        let user = this.loginForm.value;        
        this._appService.authLogin(user)
            .subscribe((user) => {               
                if (user.success) {                    
                    this.error_Login = false;                 
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("_id", user._id);
                    this._location.back();                                    
                } else {
                    this.error_Login = true;
                    this.error_message = user.message;                    
                }
            })
    }
    
}