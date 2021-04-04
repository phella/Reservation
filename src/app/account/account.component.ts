import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

import { RequestService } from '../request.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountForm: FormGroup;
  wrong: Boolean;
  error_message: String;
  email: String;
  gender: String = "Male";
  minDate = new Date(1920, 1);
  maxDate = new Date(2020, 1);

  constructor(private fb: FormBuilder, private request: RequestService, private router: Router) { }

  ngOnInit(): void {

    this.request.getUserData().subscribe( res => {
      if(res){
        const user = res['user'];
        this.gender = user.gender;
        this.email = user.email;
        this.accountForm = this.fb.group({
          username : [{value: user.username, disabled: true}],
          email: [{value: user.email, disabled: true}],
          first_name: [user.first_name],
          last_name: [user.last_name],
          address: [user.address],
          city: [user.city],
          birthdate: [user.birthdate],
          old_password: ['', Validators.required],
          password: ['']
        });
      }
      else
        this.wrong = true;
    });
  }

  setGender(gender: Boolean): void {
    this.gender = (gender) ? "Male" : "Female";
  }

  submit():void {
    this.request.updateUserData(Object.assign({}, this.accountForm.value, {email: this.email, gender: this.gender})).subscribe( 
      res => {
        alert("User Updated Successfully.");
        this.router.navigate(['home']);
      },
      err => {
        this.wrong = true;
        this.error_message = err.error.message;
      });
  }

}
