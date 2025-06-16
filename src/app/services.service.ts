import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/models/user';


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
  deleteUser(id:string): Observable<User[]>{
    return this.http.delete<User[]>(`${this.apiUrl}/${id}`)
  }

  updateUser(id: string, user: User): Observable<User[]>{
    return this.http.put<User[]>(`${this.apiUrl}/${id}`, user)
  }

  update(id:string, user:User): Observable<User[]>{
    return this.http.put<User[]>(`${this.apiUrl}/${id}`, user)
  }
}
