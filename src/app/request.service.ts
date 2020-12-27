import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  base: String = "localhost:4200/"
  constructor(private http: HttpClient) { }

  checkUser(userName: string): Observable<{Boolean}> {
    const userNameSent = userName
      ? { params: new HttpParams().set("username", userName) }
      : {};
    return this.http.get<{Boolean}>(`${this.base}user/signup`, userNameSent);
  }
  
  signup(user): Observable<{Boolean}> {
    // console.log(user);
    return this.http.post<{Boolean}>(`${this.base}user/check`, user);
  }

  login(user): Observable<{Boolean}> {
    return this.http.post<{Boolean}>(`${this.base}user/login`, user)
  }
}
