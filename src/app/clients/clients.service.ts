import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IClient } from './interfaces/client.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.apiUrl}/clients`, { headers: this.headers });
  }

  get(id: string): Observable<IClient> {
    return this.http.get<IClient>(`${this.apiUrl}/clients/${id}`, { headers: this.headers });
  }

  create(client: IClient): Observable<IClient> {
    const { id, ...body } = client;

    return this.http.post<IClient>(`${this.apiUrl}/clients`, body, { headers: this.headers });
  }

  update(client: IClient): Observable<IClient> {
    const { id, ...body } = client;

    return this.http.patch<IClient>(`${this.apiUrl}/clients/${client.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clients/${id}`, { headers: this.headers });
  }
}
