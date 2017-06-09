import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {AppService} from '../../app.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styles: []
})

export class RegisterPageComponent implements OnInit {
    signupForm: FormGroup;
    constructor(private router: Router,
                private _appService: AppService) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            "username": new FormControl("", Validators.required),
            "email": new FormControl("", [Validators.required, Validators.email]),
            "password": new FormControl("", Validators.required),
            "confirmPassword": new FormControl("", [Validators.required, , this.matchOtherValidator('password')])
        })
       
    }


    onSubmit() {
        let user = {
             username : this.signupForm.value.username,
             email : this.signupForm.value.email,
             password : this.signupForm.value.password
        }              

        this._appService.authRegister(user)
            .subscribe((user) => {
                if (user) {
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("_id", user._id)
                    return this.router.navigate(["/"])

                }
            })
    }


 
     
 matchOtherValidator(otherControlName: string) {
  let thisControl: FormControl;
  let otherControl: FormControl;

  return   (control: FormControl): {[s: string]: boolean} => {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
   
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }
 

    if (otherControl.value !== thisControl.value) {         
      return {matchOther: true};
    }

    return null;
    

  }

} 

    
}

