import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from './interfaces/brand.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IBrand[]> {

    return this.http.get<IBrand[]>(`${this.apiUrl}/brands`, { headers: this.headers });
  }

  get(id: string): Observable<IBrand> {
    return this.http.get<IBrand>(`${this.apiUrl}/brands/${id}`, { headers: this.headers });
  }

  create(brand: IBrand): Observable<IBrand> {
    const { id, ...body } = brand;

    return this.http.post<IBrand>(`${this.apiUrl}/brands`, body, { headers: this.headers });
  }

  update(brand: IBrand): Observable<IBrand> {
    const { id, ...body } = brand;

    return this.http.patch<IBrand>(`${this.apiUrl}/brands/${brand.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/brands/${id}`, { headers: this.headers });
  }
}
