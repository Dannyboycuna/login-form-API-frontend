import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserModel } from '../API/src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }
  //create a new user
  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}`, user)
  }

  //loadAllUsers
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`)
  }

  //deleteUser
  deleteUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`)
  }
}
