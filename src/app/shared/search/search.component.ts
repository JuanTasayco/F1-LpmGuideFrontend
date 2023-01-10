import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  /*  miDataListFormulary = this.fb. */

  existSearch: boolean = false;
  searchResults: any[] = [];

  currentProduct!: any;




  ngOnInit(): void {
    this.lpmService.getSectionAll().subscribe(data => {
      this.searchResults = data;
    })

  }

  getSearch(event: HTMLInputElement) {
    if (event.value.length === 0) return;
    this.searchDebounce.next(event.value.trim().toLocaleLowerCase());
    console.log(this.searchResults.length)
  }

  navigateToRoute(results: any) {
    console.log(results)
    /*  this.route.navigate([`/lpm/${results.seccion}/${results.titulo}`]) */

  }

  constructor(private lpmService: LpmService, private route: Router) { }

}
