import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit {

  nameSection: string = "vacaciones";
  vacacionesContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.vacacionesContent = infoSection;
    })
  }
  constructor(private lpmService: LpmService) {
  }

}
