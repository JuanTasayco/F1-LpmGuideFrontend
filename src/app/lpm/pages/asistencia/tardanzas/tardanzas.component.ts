import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-tardanzas',
  templateUrl: './tardanzas.component.html',
  styleUrls: ['./tardanzas.component.scss']
})
export class TardanzasComponent implements OnInit {

  nameSection: string = "tardanzas";
  tardanzasContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.tardanzasContent = infoSection;
    })
  }
  constructor(private lpmService: LpmService) {
  }
}
