import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';
@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
})
export class IngresarComponent implements OnInit {
  nameSection: string = "ingresarPersonal";
  ingresarContent!: Seccion;
  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.ingresarContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) {
  }

}
