import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io'; // sockets
import {Match} from '../models/match';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  matches: Match[];
  pending: {match, row, col}[] = [];
  seats: Object[] = [];
  visiblity: Boolean[];
  visiblity2: Boolean[];
  credit: Boolean[];
  taken: Boolean[];
  payForm: FormGroup;
  currenturl: String;
  type: String = "guest";

  constructor(private fb: FormBuilder, private req: RequestService, private router: Router,  private socket: Socket) { 
  }

  ngOnInit(): void {

    // Sockets
    this.socket.on("New Reservation",reservation =>{
      for(let i = 0; i < reservation.seats.length; i++){
        let row = reservation.seats[i]["seat_row"];
        let col = reservation.seats[i]["seat_col"];
        let m = this.getMatchOrder(reservation.match);
        this.seats[m][row][col] = 2;
      }
    });

    this.currenturl = this.router.url;
    
    if(localStorage.getItem("type") === "false")
      this.type = "user";
    else if(localStorage.getItem("type") === "true")
      this.type = "manager";

    console.log(this.type);
    
    // Form initialization
    this.payForm = this.fb.group({
      credit : ['', Validators.required],
      bin : ['', Validators.required]
      });

    this.req.getMatches().subscribe( res => {
      this.matches = res["matches"];
      this.matches.forEach( el => {
        el.date = new Date(el.date);;
      })
      this.setSeats();

      // UI variables
      this.visiblity = new Array(this.matches.length).fill(false);
      this.visiblity2 = new Array(this.matches.length).fill(false);
      this.taken = new Array(this.matches.length).fill(false);
      this.credit = new Array(this.matches.length).fill(false);

    });

  }

  getMatchOrder(matchId){
    console.log(matchId);
    for (let i =0; i < this.matches.length; i++ ){
      if(this.matches[i].id == matchId) return i; 
    }
    console.error(" Choosen Match not found");
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
    if( this.type == "user") {
      if( this.seats[match][row][col] != 2) {
        let temp = this.pending.map(function(e: {match, row, col}) { return e.match + "/" + e.row + "/" + e.col })
        let index = temp.indexOf(match + "/" + row + "/" + col);
        if(index == -1 ) {
          this.pending.push({match, row, col});
          this.seats[match][row][col] = 1;
        } else {
          this.pending.splice(index, 1);
          this.seats[match][row][col] = 0;
        }
      }
    }
  }

  proceed(match): void {
    this.visiblity2[match] = true;
  }

  back(match): void {
    this.visiblity2[match] = false;
  }

  getSeatsNumbers(m): Array<number> {
    let seats = [];
    const cols = this.matches[m].seats[0].length;
    this.pending.forEach(function(el: {match, row, col}){
      if(el.match == m)
        seats.push(el.col + el.row * cols);
    });
    return seats;
  }

  purchase(match): void{
    let seats = []
    this.getSeatsNumbers(match).forEach( el => {
      seats.push({seat_row: Math.floor(el / this.matches[match].seats.length) , seat_col: el %  this.matches[match].seats.length})
    });
    this.req.purchase({credit: this.payForm.value, match: this.matches[match].id, seats}).subscribe( res => {
        if(res.error == undefined){
          this.taken[match] = false;
          this.credit[match] = false;
          for(let i =0 ;i< this.pending.length; i++){
            if(this.pending[i].match == match) this.pending.splice(i, 1);
          }
          this.socket.removeListener("New Reservation")
          if(this.currenturl == '/home')
            this.router.navigate([''])
          else
            this.router.navigate(['/home'])
        } else if(res.error == "Seat is not available") {
          this.credit[match] = true;          
        } else{
          this.taken[match] = true;
        }
    });
  }

  setSeats(): void {
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
      }
    }
  }

  route2Signup(){
    this.router.navigate(['/signup']);
  }

  
  route2Signin(){
    this.router.navigate(['/login/user']);
  }
}
