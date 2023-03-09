import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIdSvg]'
})
export class IdSvgDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }


  ngAfterViewInit(): void {
    console.log(this.element.nativeElement)
    console.log("hola")
  }



}
