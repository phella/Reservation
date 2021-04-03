import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { RequestService } from ".././request.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  type: Boolean = true;
  constructor(private router: Router, private request: RequestService) { }

  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url.substr(0, 6) === "/admin"){
      this.type = false;
    } else {
      this.type = true;
    }
  }

  logout(): void {
    this.request.adminlogout().subscribe();
    localStorage.removeItem('TOKEN');
    this.router.navigate(['login','admin']);
  }
}
