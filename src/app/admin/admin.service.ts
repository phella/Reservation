import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class AdminService {
    base: String = "http://localhost:3000/"
    
    constructor(private http: HttpClient) { }

    getNotApprovedUsers() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJhYjY4NjRmYzY3NjFmNzNjNjExNzQiLCJpYXQiOjE2MTM0ODExMTEsImV4cCI6MTYxMzU2NzUxMX0.5i0f68amT7xUuQP1zRTFWXQWQbNcxhCQqep3qksbrDA'
        const headers = { 'Authorization': `Bearer ${token}`}
        return this.http.get<any>(`${this.base}adminstrator/waitingUsers`, { headers })
    }

    getUsers(username){
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJhYjY4NjRmYzY3NjFmNzNjNjExNzQiLCJpYXQiOjE2MTM0ODExMTEsImV4cCI6MTYxMzU2NzUxMX0.5i0f68amT7xUuQP1zRTFWXQWQbNcxhCQqep3qksbrDA'
        const headers = { 'Authorization': `Bearer ${token}`}
        const params = username
        ? new HttpParams().set("username", username)
        : new HttpParams().set("username", "")
        return this.http.get<any>(`${this.base}users`,{ headers:headers, params: params })
    }

    approveUser(id){
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJhYjY4NjRmYzY3NjFmNzNjNjExNzQiLCJpYXQiOjE2MTM0ODExMTEsImV4cCI6MTYxMzU2NzUxMX0.5i0f68amT7xUuQP1zRTFWXQWQbNcxhCQqep3qksbrDA'
        const headers = { 'Authorization': `Bearer ${token}`}
        // TODO: send headers
        return this.http.patch<any>(`${this.base}adminstrator/approve/${id}`, {})
    }

    deleteUser(id){
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJhYjY4NjRmYzY3NjFmNzNjNjExNzQiLCJpYXQiOjE2MTM0ODExMTEsImV4cCI6MTYxMzU2NzUxMX0.5i0f68amT7xUuQP1zRTFWXQWQbNcxhCQqep3qksbrDA'
        const headers = { 'Authorization': `Bearer ${token}`}
        // TODO: send headers
        return this.http.delete<any>(`${this.base}adminstrator/deleteUser/${id}`, {})
    }
}