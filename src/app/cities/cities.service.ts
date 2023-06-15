import { Injectable } from '@angular/core';
import { ICity } from './interfaces/city.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }
  
  getAll(): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${this.apiUrl}/cities`, { headers: this.headers });
  }

  get(id: string): Observable<ICity> {
    return this.http.get<ICity>(`${this.apiUrl}/cities/${id}`, { headers: this.headers });
  }

  create(city: ICity): Observable<ICity> {
    const { id, ...body } = city;

    return this.http.post<ICity>(`${this.apiUrl}/cities`, body, { headers: this.headers });
  }

  update(city: ICity): Observable<ICity> {
    const { id, ...body } = city;

    return this.http.patch<ICity>(`${this.apiUrl}/cities/${city.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cities/${id}`, { headers: this.headers });
  }
}
