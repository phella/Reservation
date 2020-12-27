import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [{ path: '', component: HomePageComponent },
                        { path: 'signup', component: LoginComponent},
                        { path: 'login', component: SignupComponent},
                        { path: 'home', component: HomePageComponent},
                        { path: 'manager', component: ManagerComponent,
                            // children: [
                              // {path: 'all', component: SearchResultsTextComponent},
                              // {path: 'images', component: SearchResultsImagesComponent},
                            // ]
                        },
                        {path:'customer' , component: CustomerComponent},
                        {path:'admin' , component: AdminComponent}
                      ]; 

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    ManagerComponent,
    CustomerComponent,
    AdminComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
