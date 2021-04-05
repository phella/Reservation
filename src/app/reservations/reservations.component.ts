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

  reservations: Reservation[] = [];
  ngOnInit(): void {
    this.request.getReservations().subscribe(res => 
        {
          this.reservations = res;
          this.reservations.forEach( el => {
            el.match.date = new Date(el.match.date);;
            el.seats = el.seats.map( seat => {
              return seat.seat_row * el.match.seats[0].length + seat.seat_col;
            })
          })
        }
    )
  }

  cancel(reservation) {
    this.request.cancelReservation(reservation._id).subscribe( res => {
      if(res.error == undefined){
        for(let i = 0; i < this.reservations.length; i++) {
          if(this.reservations[i]._id == reservation._id)
            this.reservations.splice(i, 1);
            return;
        }
      }
    });
    
  }

}
