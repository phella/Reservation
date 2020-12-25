import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forms: FormGroup[];

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.forms[0] = this.fb.group({
      message: [''],
      file : [null]
      });
  }

}
