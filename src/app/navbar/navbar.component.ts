import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { RequestService } from ".././request.service";
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  type: Boolean = true;
  page: number = 1;
  manager: string;
  constructor(private router: Router, private request: RequestService) { }

  ngOnInit(): void {
    this.manager = localStorage.getItem("type");
    const currenturl = this.router.url;
    if(this.router.url.substr(0, 6) === "/admin"){
      this.type = false;
    } else {
      this.type = true;
    }

    switch(currenturl){
      case('/admin/approve'):
      case('/home'): {
        this.page = 1;
        break;
      }
      case('/reservations'):
      case('/create-match'):
      case('/admin/deleteAccount'): {
        this.page = 2;
        break;
      }
      case('/edit-match'):{
        this.page = 3;
        break;
      }
      case('/addStadium'):{
        this.page = 4;
        break;
      }
    }
  }

  logout(admin): void {
    if( admin ) {
      this.request.adminlogout().subscribe();
      this.router.navigate(['login','admin']);
    } else {
      this.request.logout().subscribe();
      this.router.navigate(['login','user']);
    }
    localStorage.clear();
  }
}
