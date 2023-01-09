import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seccion } from '../interfaces/secciones.interface';

@Injectable({
  providedIn: 'root'
})
export class LpmService {

  url: string = environment.url;

  getDataJson(): Observable<Seccion> {
    return this.http.get<Seccion>('assets/json/db.json');
  }

  getSectionesByTitle(id: string): Observable<any> {
    return this.http.get<Seccion>(`${this.url}/lpm/${id}`);
  }

  getSectionsBySearch(terms: string): Observable<Seccion[] | any> {
    return this.http.get<Seccion[]>(`${this.url}/lpm/section/${terms}`)
      .pipe(map(seccion => seccion.map(sec => ({
        titulo: sec.titulo,
        seccion: sec.seccion,
        titulo2: sec.titulo2
      }))))
  }


  /* evento click del menu, para que funcione en cualquier componente */
  private clickNavbarObs: Subject<MouseEvent> = new Subject();
  setsharingObservableEvent(eventClick: MouseEvent) {
    this.clickNavbarObs.next(eventClick);
  }

  getsharingObservableEvent() {
    return this.clickNavbarObs.asObservable();
  }

  constructor(private http: HttpClient) { }
}
