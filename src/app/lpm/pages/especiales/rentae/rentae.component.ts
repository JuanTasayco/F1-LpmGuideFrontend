import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-rentae',
  templateUrl: './rentae.component.html',
  styleUrls: ['./rentae.component.scss']
})
export class RentaeComponent implements OnInit {

  nameSection: string = "rentaExterna";
  rentaeContent!: Seccion;

  ngOnInit(): void {
    this.lpmService.getSectionesByTitle(this.nameSection).subscribe(infoSection => {
      this.rentaeContent = infoSection;
    })
  }

  constructor(private lpmService: LpmService) {
  }

}
