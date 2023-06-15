import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProvince } from './interfaces/province.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IProvince[]> {
    return this.http.get<IProvince[]>(`${this.apiUrl}/provinces`, { headers: this.headers });
  }

  get(id: string): Observable<IProvince> {
    return this.http.get<IProvince>(`${this.apiUrl}/provinces/${id}`, { headers: this.headers });
  }

  create(province: IProvince): Observable<IProvince> {
    const { id, ...body } = province;

    return this.http.post<IProvince>(`${this.apiUrl}/provinces`, body, { headers: this.headers });
  }

  update(province: IProvince): Observable<IProvince> {
    const { id, ...body } = province;

    return this.http.patch<IProvince>(`${this.apiUrl}/provinces/${province.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/provinces/${id}`, { headers: this.headers });
  }
}
