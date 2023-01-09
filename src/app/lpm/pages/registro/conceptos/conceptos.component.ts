import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
})
export class ConceptosComponent implements OnInit {
  nameSection: string = "otrosConceptos";
  conceptosContent!: Seccion;
  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.conceptosContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) { }
}
