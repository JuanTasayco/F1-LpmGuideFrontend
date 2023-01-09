import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-ceses',
  templateUrl: './ceses.component.html',

})
export class CesesComponent implements OnInit {

  nameSection: string = "ceses";
  cesesContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.cesesContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) {
  }

}
