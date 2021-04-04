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

  matches: Reservation[];
  ngOnInit(): void {
    this.request.getReservations().subscribe(res => 
        {this.matches = res;}
    )
  }

}
