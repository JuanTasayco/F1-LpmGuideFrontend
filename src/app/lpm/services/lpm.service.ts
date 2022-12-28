import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Secciones } from '../interfaces/secciones.interface';

@Injectable({
  providedIn: 'root'
})
export class LpmService {


  getDataJson(): Observable<Secciones> {
    return this.http.get<Secciones>('assets/json/db.json');
  }

  getDataForArray(): Observable<any> {
    return this.http.get<Secciones>('assets/json/db.json')
      .pipe(map(item => Object.values(item)));
  }

  private clickNavbarObs: Subject<MouseEvent> = new Subject();

  setsharingObservableEvent(eventClick: MouseEvent) {
    this.clickNavbarObs.next(eventClick);
  }

  getsharingObservableEvent() {
    return this.clickNavbarObs.asObservable();
  }

  constructor(private http: HttpClient) { }
}
