import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.component.html',
})
export class RentaComponent implements OnInit {
  nameSection: string = "reporteRenta";
  rentaContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.rentaContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) { }
}
