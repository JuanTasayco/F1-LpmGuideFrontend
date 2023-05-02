import { ThisReceiver } from '@angular/compiler';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
import { LpmService } from '../../services/lpm.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef<HTMLDivElement>;
  @ViewChild('sidenav') sidenav!: ElementRef<HTMLDivElement>;

  widthSidenav: number = 250;

  sidenavOpenIsActive: boolean = false;

  openSidenav() {
    /* reference to sidenav */
    this.tl.to(this.sidenav.nativeElement, {
      xPercent: -100,
      duration: 0.2,
      ease: 'none',
    });
  }

  private tl = gsap.timeline({ duration: 0 });

  ngAfterViewInit(): void {
    this.content.nativeElement.classList.remove('expand');

    this.lpmService.getsharingObservableEvent().subscribe(() => {
      this.sidenavOpenIsActive = !this.sidenavOpenIsActive;
      this.content.nativeElement.classList.toggle('expand');
      if (this.sidenavOpenIsActive) {
        this.tl.play();
      } else {
        this.tl.reverse();
      }
      this.openSidenav();
    });

    this.widthSidenav = this.sidenav.nativeElement.clientWidth;
    this.cdr.detectChanges();
  }

  constructor(private lpmService: LpmService, private cdr: ChangeDetectorRef) {}
}
