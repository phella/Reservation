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

  constructor(private fb: FormBuilder, private request: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.request.getUserData().subscribe( res => {
      if(res){
        console.log(res['user'].first_name)
        this.router.navigate(['home']);
      }
      else
        this.wrong = true;
    });
  }

}
