import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { LoginRequest } from './interfaces/login-request.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { Observable, catchError, filter, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { UnauthorizedResponse } from './interfaces/unauthorized-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly apiUrl: string = environment.apiUrl;
  // private _user!: string;

  // get user() {
  //   return { ...this._user };
  // }

  constructor(private http: HttpClient) { }

  // setUser(resp: AuthResponse) {
  //   const { uid, name, email, token } = resp;
  //   localStorage.setItem('token', token!);
  //   this._user = {
  //     name: name!,
  //     uid: uid!,
  //     email: email!
  //   }
  // }

  // register(name: string, email: string, password: string) {
  //   const url = `${this.baseUrl}/auth/new`;
  //   const body = { name, email, password };

  //   return this.http.post<AuthResponse>(url, body)
  //     .pipe(
  //       tap(resp => {
  //         if (resp.ok) {
  //           this.setUser(resp);
  //         }
  //       }),
  //       map(resp => resp.ok),
  //       catchError(err => of(err.error.msg))
  //     )
  // }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.apiUrl}/login`;
    const body: LoginRequest = { email, password };

    return this.http.post<boolean>(url, body)
    .pipe(
      tap(console.log),
      map((res) => true),
      catchError(err => of(false)),
    )

      // return this.http.post<LoginResponse>(url, body)
      // .pipe(
      //   tap(res => {
      //     if (res.ok) {
      //       this.setUser(res);
      //     }
      //   }),
      //   map(resp => resp.ok),
      //   catchError(err => of(err.error.msg))
      // )

    // return this.http.post<LoginResponse>(url, body)
    //   .pipe(
    //     tap(res => {
    //       if (res.access_token) {
    //         this.setUser(res);
    //       }
    //     })
    //   )
  }

  // validateToken(): Observable<boolean> {
  //   const url = `${this.baseUrl}/auth/renew`;
  //   const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

  //   return this.http.get<AuthResponse>(url, { headers })
  //     .pipe(
  //       map(resp => {
  //         this.setUser(resp);
  //         return resp.ok;
  //       }),
  //       catchError(err => {
  //         console.log(err)
  //         return of(false);
  //       })
  //     )
  // }

  logout(): void {
    localStorage.clear();
  }
}
