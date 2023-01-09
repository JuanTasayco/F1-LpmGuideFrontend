import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-horext',
  templateUrl: './horext.component.html',

})
export class HorextComponent implements OnInit {
  nameSection: string = "horasExtras";
  horextContent!: Seccion;
  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.horextContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) { }
}
