import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IModel } from './interfaces/model.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IModel[]> {
    return this.http.get<IModel[]>(`${this.apiUrl}/models`, { headers: this.headers });
  }

  get(id: string): Observable<IModel> {
    return this.http.get<IModel>(`${this.apiUrl}/models/${id}`, { headers: this.headers });
  }

  create(model: IModel): Observable<IModel> {
    const { id, ...body } = model;

    return this.http.post<IModel>(`${this.apiUrl}/models`, body, { headers: this.headers });
  }

  update(model: IModel): Observable<IModel> {
    const { id, ...body } = model;

    return this.http.patch<IModel>(`${this.apiUrl}/models/${model.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/models/${id}`, { headers: this.headers });
  }
}
