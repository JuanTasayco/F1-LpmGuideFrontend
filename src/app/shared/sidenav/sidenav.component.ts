import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
import { LpmService } from 'src/app/lpm/services/lpm.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: ElementRef;
  sidenavOpenIsActive: boolean = false;

  itemsSidenav: any[] = [];
  itemsSidenavKeys: any[] = [];
  a: any = {};

  async ngOnInit() {
    let resultado: any[] = await this.adminService.getSectionsAvailable();
    const [...sectionsNames] = new Set(resultado);
    /* send nonRepeatSections for Logic guards */

    sectionsNames.forEach((section) => {
      this.adminService.getDataSidenav(section).subscribe((resultSeccion) => {
        this.a[section] = resultSeccion;
      });
    });
  }

  constructor(
    private lpmService: LpmService,
    private adminService: AdminService
  ) {}
}
