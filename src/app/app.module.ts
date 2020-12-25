import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [{ path: '', component: HomePageComponent },
                        { path: 'login', component: LoginComponent},
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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
