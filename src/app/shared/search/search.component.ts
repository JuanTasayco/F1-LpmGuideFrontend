import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @ViewChild("search") inputSearch !: ElementRef<any>;
  private searchDebounce: Subject<string> = new Subject;

  existSearch: boolean = false;
  searchResults: any[] = [];

  ngOnInit(): void {
    this.searchDebounce.pipe(switchMap(valor => this.lpmService.getSectionsBySearch(valor))).subscribe(results => {
      if (!results) { this.existSearch = false };
      this.searchResults = results;
      this.existSearch = true;
    })

  }

  getSearch(event: HTMLInputElement) {
    if (event.value.length === 0) return;
    this.searchDebounce.next(event.value.trim().toLocaleLowerCase());
  }

  navigateToRoute(results: any) {
    this.route.navigate([`/lpm/${results.seccion}/${results.titulo}`]);
    this.existSearch = false;
    this.inputSearch.nativeElement.value = "";
  }

  /* when the user clicks outside the box without selecting anything  */
  @HostListener('document:click', ['$event'])
  clickOutResultsBox(event: any) {
    if (!this._component.nativeElement.contains(event.target)) { this.existSearch = false; }
  }

  constructor(private lpmService: LpmService, private route: Router,
    private _component: ElementRef) { }


}
