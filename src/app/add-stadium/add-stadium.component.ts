import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

import { RequestService } from '../request.service';

@Component({
  selector: 'add-stadium',
  templateUrl: './add-stadium.component.html',
  styleUrls: ['./add-stadium.component.css']
})

export class AddStadiumComponent implements OnInit {
  addStadiumForm: FormGroup;
  wrong: Boolean;

  constructor(private fb: FormBuilder, private request: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.addStadiumForm = this.fb.group({
      name : ['', Validators.required],
      VIP_area_rows : ['', Validators.required],
      VIP_area_seats_per_row : ['', Validators.required],
      normal_area_rows : ['', Validators.required],
      seats_per_row : ['', Validators.required]
    });
  }

  submit():void {
    console.log(this.addStadiumForm.value);
    this.request.addStadium(this.addStadiumForm.value).subscribe( res => {
      if(res){
        alert("Stadium Added Successfully.");
        this.router.navigate(['home']);

      }
      else
        this.wrong = true;
    });
  }

}
