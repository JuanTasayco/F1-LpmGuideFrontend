import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import Typed from 'typed.js';
@Component({
  selector: 'app-home-design',
  templateUrl: './home-design.component.html',
  styleUrls: [],
})
export class HomeDesignComponent implements OnInit, AfterViewInit {
  posEventSidenav: number = 0;

  @ViewChildren('img') imagenesTitle!: QueryList<ElementRef>;
  ngOnInit(): void {
    /* animacion escritura */
    const options = {
      strings: ['console.log("Design: Juan Tasayco")'],
      typeSpeed: 50,
      startDelay: 1000,
      loop: true,
    };
    const typed = new Typed('#code', options);
    /* final animación escritura */
    this.animationImagesTitle();
  }

  ngAfterViewInit(): void {}

  animationImagesTitle() {
    let i: number = 0;
    setInterval(() => {
      i++;
      if (i > this.imagenesTitle.length - 1) {
        i = 0;
      }
      this.imagenesTitle.forEach((img) =>
        img.nativeElement.classList.remove('active')
      );

      this.imagenesTitle.toArray()[i].nativeElement.classList.add('active');
    }, 1000);
  }
  getEventSidenav(event: any) {
    this.posEventSidenav = event;
  }
}
