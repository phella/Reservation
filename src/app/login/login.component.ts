import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

import { RequestService } from ".././request.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forms: FormGroup[] = new Array<FormGroup>(3);
  currentForm: number = 0;
  gender: Boolean = true;
  type: Boolean = false;
  minDate = new Date(1920, 1);
  maxDate = new Date(2020, 1);
  txt: String = "Next"
  validUser: Boolean = false;

  constructor( private fb: FormBuilder, private request: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.forms[0] = this.fb.group({
      first_name: ['', Validators.required],
      last_name : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required]
      });

    this.forms[1] = this.fb.group({
      birthdate:['', Validators.required],
      city:['', Validators.required]
    });

    this.forms[2] = this.fb.group({
      address:[''],
      email:['', Validators.required]
    });

    // this.forms[1].validator = () => {return this.gender !== null;}
  }

  hasValue(): Boolean{
    return true;
  }

  setGender(gender: Boolean): void {
    this.gender = gender;
  }

  setType(type: Boolean): void {
    this.type = type;
  }

  next(): void {
    if(this.currentForm === 0) {
      this.request.checkUser(this.forms[0].value.username).subscribe( res => {
        if(res)
          this.currentForm = 1;
        else
          this.validUser = true;
      });
      // check username before going next
    } else if ( this.currentForm === 1) {
      this.forms[1].value.gender = this.gender;
      this.currentForm = 2;
      this.txt = "Submit";
    } else {
      this.request.signup( Object.assign({}, this.forms[0].value, this.forms[1].value, this.forms[2].value, {role: this.type})).subscribe(res => {
        if(res)
          this.router.navigate(['login']);
      });
    }
    
  }

  prev(): void {
    switch(this.currentForm){
      case(1):
        this.currentForm = 0;
        break;
      case(2):
        this.currentForm = 1;
        this.txt = "next";
        break;
    }
  }

}
