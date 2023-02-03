import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Seccion } from '../../interfaces/secciones.interface';
import { LpmService } from '../../services/lpm.service';

@Component({
  selector: 'app-dinamics',
  templateUrl: './dinamics.component.html'
})
export class DinamicsComponent implements OnInit {

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private lpmService: LpmService) { }

  sectionContent!: Seccion;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ title }) => this.lpmService.getSectionesByTitle(title)))
      .subscribe(infoSection => {
        this.sectionContent = infoSection;
      })

  };

}
