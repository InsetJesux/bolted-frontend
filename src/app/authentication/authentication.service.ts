import {
  HttpClient,
  HttpHeaders,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { LoginRequest } from './interfaces/login-request.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import {
  Observable,
  catchError,
  filter,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { UnauthorizedResponse } from './interfaces/unauthorized-response.interface';
import { IUser } from '../users/interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private readonly router: Router) {}

  get headers() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return headers;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/login`;
    const body: LoginRequest = { email, password };

    return this.http.post<boolean>(url, body).pipe(
      tap(console.log),
      map((res) => {
        localStorage.setItem('token', res.access_token!);
        return true;
      }),
      catchError((err) => of(false))
    );
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/profile`, {
      headers: this.headers,
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }
}
