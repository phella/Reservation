import { Component, OnInit } from '@angular/core';

import {Match} from '../models/match';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  matches: Match[] = new Array(4);
  pending: Object[] = [];
  seats: Object[] = [];
  visiblity: Boolean[];
  constructor() { }

  ngOnInit(): void {
    let temp: Array<Array<Boolean>> = new Array();
    for( let i = 0 ; i < 20; i++){
      let temp2 = new Array();
      for ( let j = 0; j < 20; j++) {
        temp2.push(false);
      }
      temp.push(temp2);
    }
    this.matches[0] = {home_team: 'Al Ahly', away_team: 'Al Zamalek', match_venue: 'Borg El Arab',date: new Date(),main_referee: 'Ehab Tawfek',
                        line_man1: 'Hmada El Gn', line_man2: 'Hossam Ahmed',seats: temp
                      };
    for( let m = 0; m < this.matches.length; m++) {
      let new_temp = [];
      if(this.matches[m]) {
      for(let i = 0; i < this.matches[m].seats.length; i++){
        let row = [];
        for(let j = 0; j < this.matches[m].seats[i].length; j++){
          if(this.matches[m].seats[i][j] == true) row.push(2);
          else row.push(0);
        }
        new_temp.push(row);
      }
      this.seats.push(new_temp);
      console.log(this.seats[0])
    }
    }
    this.visiblity = new Array(this.matches.length).fill(false);
  }

  toggleView(index): void {
    this.visiblity[index] = !this.visiblity[index];
  }

  check(match, row, col): number {
      let state = this.matches[match].seats[row][col];
      if(state == true) return 2;
      else {
        this.pending.forEach(element => {
          if({match, row, col} == element) return 1;
        });
      }
      return 0;
  }

  request(match: number, row: number, col: number):void {
    this.pending.push({match, row, col});
    console.log(this.seats[match]);
    this.seats[match][row][col] = 1;
  }
}
