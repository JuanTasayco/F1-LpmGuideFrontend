import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { environment } from 'src/environments/environment';
import { Register } from '../interfaces/register-interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url: string = environment.url;

  getDataSidenav(term: string) {
    return this.http.get<Seccion[]>(`${this.url}/lpm/sections/${term}`).pipe(
      map((block) =>
        block.map((sec) => ({
          id: sec.id,
          section: sec.seccion,
          title: sec.titulo,
          title2: sec.titulo2,
        }))
      )
    );
  }

  async getSectionsAvailable(): Promise<Seccion[] | string[]> {
    return await firstValueFrom(
      this.http
        .get<Seccion[]>(`${this.url}/lpm`)
        .pipe(map((results) => results.map((block) => block.seccion)))
    );
  }

  getDataByIdForEdit(id: string) {
    /* antes tenía [] por si algo ocurre */
    return this.http.get<any>(`${this.url}/lpm/${id}`);
  }

  createSection(section: any): Observable<Register | any> {
    return this.http.post<Register>(`${this.url}/lpm`, section).pipe(
      map(() => true),
      catchError((err: HttpErrorResponse) =>
        of({ msg: err.error.message, val: false })
      )
    );
  }

  deleteSection(id: string) {
    return this.http.delete(`${this.url}/lpm/section/${id}`);
  }

  updateSection(id: string, section: any) {
    return this.http.patch(`${this.url}/lpm/section/${id}`, section);
  }

  constructor(private http: HttpClient) {}
}
