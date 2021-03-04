import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { SignInRequestPayload } from './signin-request.payload';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('email'),
    password: new FormControl('password')
  });
  
  signinRequestPayload : SignInRequestPayload;
  constructor(private authService: AuthService) {
    this.signinRequestPayload = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  login() {
    this.signinRequestPayload.email = this.loginForm?.get('email')?.value;
    this.signinRequestPayload.password = this.loginForm?.get('password')?.value;

    this.authService.login(this.signinRequestPayload).subscribe(data => {
      console.log('Giriş başarılı');
    });
  }

}
