import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{


  registerForm = this.formBuilder.group({
    emailAddress: [''],
    displayName: [''],
    password: [''],
});

constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
) {}

ngOnInit() {
    if (this.authService.isLoggedIn) {
        this.router.navigate(['/']);
    }
}

register() {
    this.authService
        .signUp({
            email: this.registerForm.value.emailAddress!,
            foodUserName: this.registerForm.value.displayName!,
            password: this.registerForm.value.password!,
        })
        .subscribe(() => {
            this.router.navigate(['login']);
        });
}

}
