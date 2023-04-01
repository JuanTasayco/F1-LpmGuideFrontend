import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/admin/interfaces/user-interface';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../interfaces/userLog-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  user!: UserAuth;
  baseUrl: string = environment.url;

  createUser(formUser: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, formUser);
  }

  loginUser(credenciales: any): Observable<any> {
    return this.http
      .post<UserAuth>(`${this.baseUrl}/auth/login`, credenciales)
      .pipe(
        tap((userResponse) => {
          /* asignamos la respuesta a nuestra propiedad user */
          this.user = userResponse;
          localStorage.setItem('key-token', this.user.token);
        }),
        map(() => ({ valor: true, msg: '' })),
        catchError((err) => of({ valor: false, msg: err.error.message }))
      );
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
