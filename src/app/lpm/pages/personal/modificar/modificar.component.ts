import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
})
export class ModificarComponent implements OnInit {

  nameSection: string = "modificar";
  modificarContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.modificarContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) {
  }

}
