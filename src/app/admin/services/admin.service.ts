import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = environment.url;


  getDataSidenav(term: string) {
    return this.http.get<Seccion[]>(`${this.url}/lpm/sections/${term}`)
      .pipe(map(block => block.map(sec => ({
        id: sec.id,
        section: sec.seccion,
        title: sec.titulo,
        title2: sec.titulo2
      }))))
  }

  async getSectionsAvailable(): Promise<Seccion[] | string[]> {
    return await firstValueFrom(this.http.get<Seccion[]>(`${this.url}/lpm`)
      .pipe(map(results => results.map(block => block.seccion))))
  }

  getDataById(id: string) {
    return this.http.get<Seccion[]>(`${this.url}/lpm/${id}`)
  }



  constructor(private http: HttpClient) { }
}
