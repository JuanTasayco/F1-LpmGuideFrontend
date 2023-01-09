import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-adelantos',
  templateUrl: './adelantos.component.html',

})
export class AdelantosComponent implements OnInit {
  nameSection: string = "adelantos";
  adelantosContent!: Seccion;
  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.adelantosContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) { }
}
