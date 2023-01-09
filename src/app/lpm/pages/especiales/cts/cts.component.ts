import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-cts',
  templateUrl: './cts.component.html',

})
export class CtsComponent implements OnInit {
  nameSection: string = "cts";
  ctsContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.ctsContent = infoSection;
    })
  }
  constructor(private lpmService: LpmService) {
  }

}
