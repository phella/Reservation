import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Match } from './models/match';



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  base: String = "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  checkUser(userName: string): Observable<{Boolean}> {
    const userNameSent = userName
      ? { params: new HttpParams().set("username", userName) }
      : {};
    return this.http.get<{Boolean}>(`${this.base}users/check`, userNameSent);
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


  getMatches(): Observable<{matches}> {
    return this.http.get<{matches}>(`${this.base}fans/getallmatches`)
  }

  purchase(param): Observable<any> {
    const userNameSent = param
    ? { params: new HttpParams().set("username", param) }
    : {};
    return this.http.post<{any}>(`${this.base}fans/addreservation`, userNameSent);
  }
}
