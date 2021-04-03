import { AdminService } from './admin/admin.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
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


const routes: Routes = [{ path: '', component: HomePageComponent },
                        { path: 'signup', component: LoginComponent},
                        { path: 'login/:id', component: SignupComponent},
                        { path: 'home', component: HomePageComponent},
                        { path: 'manager', component: ManagerComponent},
                        {path:'addStadium', component: AddStadiumComponent},
                        {path: 'account', component: AccountComponent},
                        { path :'create-match', component: CreateMatchComponent},
                        {path :'edit-match', component: EditMatchComponent},
                        {path:'customer' , component: CustomerComponent},
                        {path:'admin/approve' , component: AdminApproveComponent},
                        {path:'admin/deleteAccount' , component: DeleteAccountComponent},
                        {path:'reservations', component: ReservationsComponent}
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
    EditMatchComponent
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
    {provide: HTTP_INTERCEPTORS , useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
