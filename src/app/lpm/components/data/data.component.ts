import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Seccion } from '../../interfaces/secciones.interface';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements AfterViewInit, OnInit {

  @ViewChild("image") pImage !: any;

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  @Input() content!: Seccion;

}
