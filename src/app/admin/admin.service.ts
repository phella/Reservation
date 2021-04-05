import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
  })
export class AdminService {
    base: String = "http://localhost:3000/"
    
    constructor(private http: HttpClient) { }

    getNotApprovedUsers() {
        return this.http.get<any>(`${this.base}adminstrator/waitingUsers`, {})
    }

    getUsers(username){
        const params = username
        ? new HttpParams().set("username", username)
        : new HttpParams().set("username", "")
        return this.http.get<any>(`${this.base}users`,{params: params })
    }

    approveUser(id){
        return this.http.patch<any>(`${this.base}adminstrator/approve/${id}`, {})
    }

    deleteUser(id){
        return this.http.delete<any>(`${this.base}adminstrator/deleteUser/${id}`, {})
    }
}