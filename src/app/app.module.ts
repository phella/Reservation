import { AdminService } from './admin/admin.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule,Routes, RouterStateSnapshot, CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {CreateMatchComponent} from './create-match/create-match.component'
import { ManagerComponent } from './manager/manager.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminApproveComponent } from './admin/adminApprove.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddStadiumComponent } from './add-stadium/add-stadium.component';
import { AccountComponent } from './account/account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { AddTokenInterceptor } from './add-token.interceptor';
import { EditMatchComponent } from './edit-match/edit-match.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { Observable } from 'rxjs';


@Injectable()
export class Authorized implements CanActivate {
  user_routes = ['/account', '/reservations'];
  admin_routes = ['/admin/approve', '/admin/deleteAccount'];
  manager_routes = [ '/manager', '/addstadium', '/create-match', '/edit-match']; 
  constructor(private router: Router){};
  
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    var token = localStorage.getItem('TOKEN');
    if(token === null)
     {
       window.alert("Unauthorized user, please log in first!");
       this.router.navigate(['/login/user']);
       return false;
      }
    const type = localStorage.getItem('type');
    const admin = localStorage.getItem('admin');
    let url = state.url;
    
    console.log(url);
    if(admin){
      if(this.admin_routes.includes(url)) return true;
      else return false;
    }
    
    if(type == "true"){ // Manager
      if(this.manager_routes.includes(url)) return true;
      else return false;
    }
    
    // User
    if(this.user_routes.includes(url)) return true;
      else return false;
    
  }
   
}




const routes: Routes = [{path: 'signup', component: LoginComponent},
                        {path: 'login/:id', component: SignupComponent},
                        {path: 'home', component: HomePageComponent},
                        {path: 'manager', component: ManagerComponent, canActivate: [Authorized]},
                        {path:'addStadium', component: AddStadiumComponent, canActivate: [Authorized]},
                        {path: 'account', component: AccountComponent, canActivate: [Authorized]},
                        {path :'create-match', component: CreateMatchComponent, canActivate: [Authorized]},
                        {path :'edit-match', component: EditMatchComponent, canActivate: [Authorized]},
                        {path:'customer' , component: CustomerComponent},
                        {path:'admin/approve' , component: AdminApproveComponent, canActivate: [Authorized]},
                        {path:'admin/deleteAccount' , component: DeleteAccountComponent, canActivate: [Authorized]},
                        {path:'reservations', component: ReservationsComponent, canActivate: [Authorized]},
                        {path: '*', component: HomePageComponent }
                      ]; 

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    ManagerComponent,
    CreateMatchComponent,
    CustomerComponent,
    AdminApproveComponent,
    SignupComponent,
    NavbarComponent,
    AddStadiumComponent,
    AccountComponent,
    DeleteAccountComponent,
    EditMatchComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    AdminService,
    Authorized,
    {provide: HTTP_INTERCEPTORS , useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
