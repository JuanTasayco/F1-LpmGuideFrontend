import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-faltas',
  templateUrl: './faltas.component.html'
})
export class FaltasComponent implements OnInit {

  nameSection: string = "faltas";
  faltasContent!: Seccion;
  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.faltasContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) { }

}
