import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  base: String = "http://localhost:3000/"
  userID: String;

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

  login(user): Observable<{Boolean}> {
    const res = this.http.post<{Boolean}>(`${this.base}users/signin`, user);
    console.log(res)
    // this.userID = res['user']._id;
    return res;
  }

  purchase(obj): Observable<{msg: string}> {
    return this.http.post<{msg: string}>(`${this.base}user/purchase`, obj)
  }

  addStadium(obj): Observable<{msg: string}> {
    return this.http.post<{msg: string}>(`${this.base}manager/stadium`, obj)
  }

  getUserData(): Observable<{Boolean}> {
    return this.http.get<{Boolean}>(`${this.base}users/getdata/${this.userID}`)
  }
}
