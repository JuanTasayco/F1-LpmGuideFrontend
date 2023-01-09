import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  private searchDebounce: Subject<string> = new Subject;

  constructor(private lpmService: LpmService, private route: Router) { }

  existSearch: boolean = false;
  resultsSearch: any[] = [];

  ngOnInit(): void {

    this.searchDebounce
      .pipe(
        debounceTime(400),
        switchMap(value => this.lpmService.getSectionsBySearch(value)))
      .subscribe(results => {
        if (!results) { this.existSearch = false; } else {
          this.existSearch = true;
          this.resultsSearch = results;
        };
      })
  }

  getSearch(event: HTMLInputElement) {
    if (event.value.length === 0) return;
    this.searchDebounce.next(event.value.trim().toLocaleLowerCase());
    console.log(this.resultsSearch.length)
  }

  navigateToRoute(results: any) {
    this.route.navigate([`/lpm/${results.seccion}/${results.titulo}`])

  }

}
