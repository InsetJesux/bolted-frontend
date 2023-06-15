import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IWorkorder } from './interfaces/workorder.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkordersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IWorkorder[]> {
    return this.http.get<IWorkorder[]>(`${this.apiUrl}/workorders`, { headers: this.headers });
  }

  get(id: string): Observable<IWorkorder> {
    return this.http.get<IWorkorder>(`${this.apiUrl}/workorders/${id}`, { headers: this.headers });
  }

  create(workorder: IWorkorder): Observable<IWorkorder> {
    const { id, ...body } = workorder;

    return this.http.post<IWorkorder>(`${this.apiUrl}/workorders`, body, { headers: this.headers });
  }

  update(workorder: IWorkorder): Observable<IWorkorder> {
    const { id, ...body } = workorder;

    return this.http.patch<IWorkorder>(`${this.apiUrl}/workorders/${workorder.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/workorders/${id}`, { headers: this.headers });
  }
}
