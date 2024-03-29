import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  Subject,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seccion } from '../interfaces/secciones.interface';

@Injectable({
  providedIn: 'root',
})
export class LpmService {
  url: string = environment.url;

  /*   getDataJson(): Observable<Seccion> {
    return this.http.get<Seccion>('assets/json/db.json');
  } */

  getSectionesByTitle(id: string): Observable<any> {
    return this.http.get<Seccion>(`${this.url}/lpm/${id}`);
  }

  getSectionsBySearch(terms: string): Observable<Seccion[] | any> {
    return this.http.get<Seccion[]>(`${this.url}/lpm/titles/${terms}`).pipe(
      map((seccion) =>
        seccion.map((sec) => ({
          titulo: sec.titulo,
          seccion: sec.seccion,
          titulo2: sec.titulo2,
        }))
      )
    );
  }

  getSectionAll(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.url}/lpm`);
  }

  /* evento click del menu, para que funcione en cualquier componente */
  private clickNavbarObs: Subject<MouseEvent> = new Subject();
  setsharingObservableEvent(eventClick: MouseEvent) {
    this.clickNavbarObs.next(eventClick);
  }

  getsharingObservableEvent() {
    return this.clickNavbarObs.asObservable();
  }

  /* enviar secciones del módulo al guard para hacer lógica de validacíon de rutas en section*/

  private nonRepeatingSections: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}
}
