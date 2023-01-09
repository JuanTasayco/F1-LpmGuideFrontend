import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',

})
export class IngresosComponent implements OnInit {

  nameSection: string = "otrosIngresos";
  ingresosContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.ingresosContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) { }

}
