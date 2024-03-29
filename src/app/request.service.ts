import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Match } from './models/match';
import { Reservation } from './models/reservation';
import { IfStmt } from '@angular/compiler';
import { Socket } from 'ngx-socket-io'; // sockets


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  base: String = "http://localhost:3000/"
  userID: String;

  constructor(private http: HttpClient, private socket: Socket) { }

  checkUser(userName: string): Observable<{error, free}> {
    const userNameSent = userName
      ? { params: new HttpParams().set("username", userName) }
      : {};
    return this.http.get<{error, free}>(`${this.base}users/check`, userNameSent);
  }
  
  signup(user): Observable<{Boolean}> {
    // console.log(user);
    return this.http.post<{Boolean}>(`${this.base}users/signup`, user);
  }

  login(user): Observable<any> {
    return this.http.post<any>(`${this.base}users/signin`, user).pipe(
      map(res => res),
      map(err => err)
    );
  }


  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.base}fans/getallmatches`)
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.base}fans/getreservations`).pipe(
      catchError(this.handleError)
      );
  }

  cancelReservation(id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {id},
    };
    return this.http.delete<any>(`${this.base}fans/cancelreservation`, options);
  } 

  purchase(reservations): Observable<any> {
    return this.http.post<{any}>(`${this.base}fans/addreservation`, reservations);
  }

  addStadium(obj): Observable<{msg: string}> {
    return this.http.post<{msg: string}>(`${this.base}manager/stadium`, obj)
  }

  getUserData(): Observable<{Boolean}> {
    return this.http.get<{Boolean}>(`${this.base}users/getUserData`)
  }

  updateUserData(obj): Observable<{Boolean}> {
    return this.http.post<{Boolean}>(`${this.base}users/updateUserData`, obj)
  }

  loginadmin(user): Observable<any> {
    return this.http.post<any>(`${this.base}adminstrator/signin`, user).pipe(
      map(res => res),
      map(err => err)
    );
  }

  adminlogout(): Observable<any> {
    return this.http.post<any>(`${this.base}adminstrator/logout`, {});
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.base}users/logout`, {});
  }


  private handleError(error: HttpErrorResponse){
    if(error.status === 401) // unauthorized
      localStorage.clear();

    return throwError("unauthorized");
  }
  
}
