import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AgregarComponent } from './pages/agregar-section/agregar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { IdSvgDirective } from './directives/id-svg.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarUserComponent } from './pages/agregar-user/agregar-user.component';


@NgModule({
  declarations: [
    HomeComponent,
    AgregarComponent,
    NavbarComponent,
    SidenavComponent,
    SafeHtmlPipe,
    IdSvgDirective,
    AgregarUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
