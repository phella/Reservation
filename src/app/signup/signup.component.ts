import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

import { RequestService } from '../request.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginForm: FormGroup;
  wrong: Boolean = false;
  error_message: String;

  constructor(private fb: FormBuilder, private request: RequestService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
      });
  }

  submit():void {
    this.request.login(this.loginForm.value).subscribe( 
      res => {
        localStorage.setItem('TOKEN', res.token);
        this.router.navigate(['home']);
      },
      err => {
        console.log(err.error.message);
        this.wrong = true;
        this.error_message = err.error.message;
      }
    );
  }
}
