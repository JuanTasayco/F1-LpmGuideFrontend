import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/admin/interfaces/user-interface';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../interfaces/userLog-interface';

export interface ResponseError {
  valor: boolean;
  msg: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private _user!: UserAuth;
  errorAuthorization: string = '';

  baseUrl: string = environment.url;

  createUser(formUser: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, formUser).pipe(
      map(() => true),
      catchError((err) => of(err.error.message))
    );
  }

  get user() {
    return this._user;
  }

  loginUser(credenciales: any): Observable<boolean | ResponseError> {
    return this.http
      .post<UserAuth>(`${this.baseUrl}/auth/login`, credenciales)
      .pipe(
        tap((userResponse) => {
          localStorage.setItem('token', userResponse.token);
        }),
        map(() => true),
        catchError((err) => of(err.error.message))
      );
  }

  verifyTokenForAccess() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http
      .get<UserAuth>(`${this.baseUrl}/auth/verify`, { headers })
      .pipe(
        tap((result) => {
          this._user = result;
        }),
        map(() => true),
        catchError((err) => {
          this.errorAuthorization = err.error.message;
          return of(false);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.baseUrl}/auth/delete/${id}`)
      .pipe(catchError(() => of(false)));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/all`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/user/${id}`);
  }

  updateUserById(id: string, changesForm: any) {
    return this.http.post(`${this.baseUrl}/auth/updateUser/${id}`, changesForm);
  }
}
