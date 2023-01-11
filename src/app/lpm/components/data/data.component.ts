import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Seccion } from '../../interfaces/secciones.interface';
import { gsap } from "gsap";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements AfterViewInit, OnInit {

  @ViewChild("image") pImage !: any;
  @ViewChild("dataComponent") dataComponent !: ElementRef;


  ngOnInit(): void {


  }

  ngAfterViewInit(): void {

    gsap.from(this.dataComponent.nativeElement, {
      opacity: 0
    })

  }

  @Input() content!: Seccion;

}
