import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {

  stadiums = []
  matches = []
  dict = {};
  dict_matches={}
  title = 'Bind DropDownList';
  ddlProduct = "";
  choosenMatch="";
  log(x){console.log(x);}
  constructor(private http: HttpClient, private router: Router) { }

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

    this.http.get<any>('http://localhost:3000/fans/getallmatches').subscribe(data => {
      var i;
      for (i = 0; i < data.matches.length; i++) {
        this.matches.push(data.matches[i].home_team+" Vs "+ data.matches[i].away_team +" : "+data.matches[i].date+" at "+ data.matches[i].stadium)
        this.dict_matches[(data.matches[i].home_team+" Vs "+ data.matches[i].away_team +" : "+data.matches[i].date+" at "+ data.matches[i].stadium).toString()]=[data.matches[i]._id]
      }
    });
  }

  submit(homeTeamValue,awayTeamValue,dateValue,mainRefreeValue,lines1ManValue,lines2ManValue):void {
    localStorage.getItem('TOKEN')
    const headers = { };
    const body = { };
    if(homeTeamValue.value.length > 0) body["home_team"]=homeTeamValue.value.toString();
    if(awayTeamValue.value.length > 0) body["away_team"]=awayTeamValue.value.toString();
    if(dateValue.value.length > 0) body["date"]=new Date(dateValue.value);
    body["match_venue"]=this.dict[this.ddlProduct];
    body["stadium"]=this.ddlProduct;
    if(mainRefreeValue.value.length > 0) body["main_referee"]=mainRefreeValue.value.toString();
    if(lines1ManValue.value.length > 0) body["line_man1"]=lines1ManValue.value.toString();
    if(lines2ManValue.value.length > 0) body["line_man2"]=lines2ManValue.value.toString();
    const params={'matchID':this.dict_matches[this.choosenMatch].toString()}
    this.http.patch<any>('http://localhost:3000/manager/match/'+this.dict_matches[this.choosenMatch].toString(), body, { headers }).subscribe(data => {
        console.log(data)
    });
    this.router.navigate(['home']);
  }

}
