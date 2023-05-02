import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { gsap } from "gsap"
import { takeLast } from 'rxjs';
import { LpmService } from 'src/app/lpm/services/lpm.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent implements AfterViewInit {

  @ViewChild("hamburguer") hamburguer!: ElementRef;
  @ViewChild("hamburguerImg") hamburguerImg!: ElementRef;
  @ViewChild("lpmLogo") lpmLogo!: ElementRef;

  @Input() widthSidenav!: number;


  menuOpenIsActive: boolean = true;
  private tl = gsap.timeline({ duration: 0 });


  ngAfterViewInit(): void {
    this.openMenu();
  }

  openMenu() {
    this.tl.add("start").to(this.hamburguerImg.nativeElement, { scaleX: 0.3 }, "start")
    this.tl.to(this.hamburguer.nativeElement, { transformOrigin: "center left", scaleX: 2.28 }, "start")
    this.tl.to(this.lpmLogo.nativeElement, { x: 140 }, "start")
  }

  clickOpenMenu(event: MouseEvent) {
    this.menuOpenIsActive = !this.menuOpenIsActive;
    if (this.menuOpenIsActive) { this.tl.play() } else { this.tl.reverse(); }
    this.lpmService.setsharingObservableEvent(event);
  }

  constructor(private lpmService: LpmService) { }

}
