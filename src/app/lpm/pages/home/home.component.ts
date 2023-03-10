import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { gsap } from 'gsap';
import { LpmService } from '../../services/lpm.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {

  @ViewChild("content") content!: ElementRef<HTMLDivElement>;
  @ViewChild("sidenav") sidenav!: ElementRef<HTMLDivElement>;

  widthSidenav: number = 250;

  sidenavOpenIsActive: boolean = false;

  openSidenav() {
    this.tl.to(this.sidenav.nativeElement, {
      xPercent: -100, duration: .3, ease: "none"
    })
  }

  private tl = gsap.timeline({ duration: 0 });

  ngAfterViewInit(): void {
    this.lpmService.getsharingObservableEvent().subscribe(() => {
      this.sidenavOpenIsActive = !this.sidenavOpenIsActive;
      this.content.nativeElement.classList.toggle("expand")
      if (this.sidenavOpenIsActive) { this.tl.reverse(); } else { this.tl.play(); }
    })
    this.openSidenav();
    this.widthSidenav = this.sidenav.nativeElement.clientWidth;
    this.cdr.detectChanges();
  }

  constructor(private lpmService: LpmService, private cdr: ChangeDetectorRef) { }

}
