import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-gratificacion',
  templateUrl: './gratificacion.component.html',

})
export class GratificacionComponent implements OnInit {
  nameSection: string = "gratificacion";
  gratificacionContent!: Seccion;


  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.gratificacionContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) {
  }

}
