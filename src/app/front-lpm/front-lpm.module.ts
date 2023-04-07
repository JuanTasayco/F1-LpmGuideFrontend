import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontLpmRoutingModule } from './front-lpm-routing.module';
import { HomeDesignComponent } from './pages/home-design/home-design.component';
import { NavPrincipalComponent } from './shared/nav-principal/nav-principal.component';

@NgModule({
  declarations: [HomeDesignComponent, NavPrincipalComponent],
  imports: [CommonModule, FrontLpmRoutingModule],
})
export class FrontLpmModule {}
