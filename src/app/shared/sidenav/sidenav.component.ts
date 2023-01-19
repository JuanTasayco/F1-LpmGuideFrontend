import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LpmService } from 'src/app/lpm/services/lpm.service';

; @Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {

  @ViewChild("sidenav") sidenav!: ElementRef;
  sidenavOpenIsActive: boolean = false;

  itemsSidenav!: any;
  itemsSidenavKeys: string[] | any = [];


  ngOnInit(): void {
    this.lpmService.getDataJson().subscribe(itemsSection => {
      this.itemsSidenav = itemsSection;
      this.itemsSidenavKeys.push(Object.keys(itemsSection));
      this.itemsSidenavKeys = this.itemsSidenavKeys.flat();
    })
  }

  constructor(private lpmService: LpmService) { }


}
