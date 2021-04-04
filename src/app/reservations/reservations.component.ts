import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  constructor(private request: RequestService) { }

  matches: Match[];
  ngOnInit(): void {
    this.request.getMatches().subscribe(res => 
        {this.matches = res;}
    )
  }

}
