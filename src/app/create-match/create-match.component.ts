import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { HttpClient } from '@angular/common/http';
import {FormGroup , FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css'],
})
export class CreateMatchComponent implements OnInit {
  stadiums = []
  title = 'Bind DropDownList';
  ddlProduct = "";
  log(x){console.log(x);}
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = { };
    const body = { };
    this.http.get<any>('http://localhost:3000/manager/getAllStadium').subscribe(data => {
      var i;
      for (i = 0; i < data.stadium.length; i++) {
        this.stadiums.push(data.stadium[i].name)
      }
    });
    console.log(this.stadiums)
  }

  submit(homeTeamValue,awayTeamValue,dateValue,mainRefreeValue,lines1ManValue,lines2ManValue):void {
    console.log(homeTeamValue.value)
    console.log(awayTeamValue.value)
    console.log(dateValue.value)
    console.log(mainRefreeValue.value)
    console.log(lines1ManValue.value)
    console.log(lines2ManValue.value)
    console.log(this.ddlProduct)
    // const headers = { 'Authorization': 'Bearer my-token'};
    // const body = { title: 'Angular POST Request Example' };
    // this.http.post<any>('https://jsonplaceholder.typicode.com/posts', body, { headers }).subscribe(data => {
    //     console.log(data)
    // });
  }

}
