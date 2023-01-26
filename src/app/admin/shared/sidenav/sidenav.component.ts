import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/lpm/interfaces/secciones.interface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {


  resultsBySeccion: any[] = [];

  async ngOnInit() {
    let resultado: any[] = await this.adminService.getSectionsAvailable()
    const [...secciones] = new Set(resultado);

    secciones.forEach(seccion => {
      this.adminService.getDataSidenav(seccion)
        .subscribe(resultSeccion => {
          this.resultsBySeccion.push(resultSeccion);
        })
    })
  }

  constructor(private adminService: AdminService) {
  }

}
