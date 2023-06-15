import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStorage } from './interfaces/storage.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoragesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    return headers;
  }

  getAll(): Observable<IStorage[]> {
    return this.http.get<IStorage[]>(`${this.apiUrl}/storages`, { headers: this.headers });
  }

  get(id: string): Observable<IStorage> {
    return this.http.get<IStorage>(`${this.apiUrl}/storages/${id}`, { headers: this.headers });
  }

  create(storage: IStorage): Observable<IStorage> {
    const { id, ...body } = storage;

    return this.http.post<IStorage>(`${this.apiUrl}/storages`, body, { headers: this.headers });
  }

  update(storage: IStorage): Observable<IStorage> {
    const { id, ...body } = storage;

    return this.http.patch<IStorage>(`${this.apiUrl}/storages/${storage.id}`, body, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/storages/${id}`, { headers: this.headers });
  }
}
