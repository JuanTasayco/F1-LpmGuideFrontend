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
import { InstructionsBannerComponent } from './shared/instructions-banner/instructions-banner.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { StatusUserPipe } from './pipes/status-user.pipe';
import { ImagePipe } from './pipes/image.pipe';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    HomeComponent,
    AgregarComponent,
    NavbarComponent,
    SidenavComponent,
    SafeHtmlPipe,
    IdSvgDirective,
    AgregarUserComponent,
    InstructionsBannerComponent,
    StatusUserPipe,
    ImagePipe,
    EditarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgPrimeModule,
  ],
})
export class AdminModule {}
