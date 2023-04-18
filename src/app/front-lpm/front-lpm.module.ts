import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontLpmRoutingModule } from './front-lpm-routing.module';
import { HomeDesignComponent } from './pages/home-design/home-design.component';
import { NavPrincipalComponent } from './shared/nav-principal/nav-principal.component';
import { FooterDesignComponent } from './shared/footer-design/footer-design.component';
import { HomeDataComponent } from './data/home-data/home-data.component';

@NgModule({
  declarations: [
    HomeDesignComponent,
    NavPrincipalComponent,
    FooterDesignComponent,
    HomeDataComponent,
  ],
  imports: [CommonModule, FrontLpmRoutingModule],
})
export class FrontLpmModule {}
