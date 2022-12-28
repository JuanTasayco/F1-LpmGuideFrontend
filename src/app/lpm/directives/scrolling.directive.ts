import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrolling]'
})
export class ScrollingDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.el.nativeElement.scrollIntoView();
  }

}
