import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {
  log(x){console.log(x);}

  constructor() { }

  ngOnInit(): void {
  }

  submit():void {
    console.log("jewkeqwe")
  }

}
