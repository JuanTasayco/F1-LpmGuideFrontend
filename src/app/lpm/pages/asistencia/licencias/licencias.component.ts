import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
})
export class LicenciasComponent implements OnInit {
  nameSection: string = "licencias";
  licenciasContent!: Seccion;
  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.licenciasContent = infoSection;
    })
  }
  constructor(private lpmService: LpmService) {

  }
}
