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
  stadiums = [];
  dict = {};
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
        this.dict[data.stadium[i].name]=[data.stadium[i]._id]
      }
    });
    console.log(this.stadiums)
    console.log(this.dict)
  }

  submit(homeTeamValue,awayTeamValue,dateValue,mainRefreeValue,lines1ManValue,lines2ManValue):void {
    console.log(homeTeamValue.value)
    console.log(awayTeamValue.value)
    console.log(dateValue.value)
    console.log(mainRefreeValue.value)
    console.log(lines1ManValue.value)
    console.log(lines2ManValue.value)
    console.log(this.ddlProduct)
    localStorage.getItem('token')

    const headers = { };
    const body = {
    "home_team":homeTeamValue.value.toString(),
    "away_team":awayTeamValue.value.toString(),
    "date":new Date(dateValue.value),
    "match_venue":this.dict[this.ddlProduct].toString(),
    "stadium":this.ddlProduct,
    "main_referee":mainRefreeValue.value.toString(),
    "line_man1":lines1ManValue.value.toString(),
    "line_man2":lines2ManValue.value.toString() 
  };
    try{
      this.http.post<any>('http://localhost:3000/manager/match', body, { headers }).subscribe(data => {
        console.log(data)
    });
    }catch(error){
      console.log(error)
    }
    
  }

}
