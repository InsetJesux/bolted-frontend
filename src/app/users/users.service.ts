import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  get(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }

  create(user: IUser): Observable<IUser> {
    const { id, ...body } = user;

    return this.http.post<IUser>(`${this.apiUrl}/users`, body, { headers: this.headers });
  }

  update(user: IUser): Observable<IUser> {
    const { id, ...body } = user;

    return this.http.patch<IUser>(`${this.apiUrl}/users/${user.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers: this.headers });
  }
}
