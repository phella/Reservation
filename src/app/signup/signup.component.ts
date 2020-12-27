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
  wrong: Boolean;

  constructor(private fb: FormBuilder, private request: RequestService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
      });

  }

  submit():void {
    this.request.login(this.loginForm.value).subscribe( res => {
      if(res)
        this.router.navigate(['home']);
      else
        this.wrong = true;
    });
  }
}
