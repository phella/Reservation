import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Match } from '../models/match';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  constructor(private request: RequestService) { }

  matches: Match[] = [];
  ngOnInit(): void {
    this.request.getReservations().subscribe(res => 
        {
          for(let i=0;i<res.length;i++){
            this.matches.push(res[i]["match"]);  
          }
          this.matches.forEach( el => {
            el.date = new Date(el.date);;
          })
          console.log(this.matches)
        }
    )
  }

}
