import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LpmRoutingModule } from './lpm-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { ProcesosComponent } from './pages/principal/procesos/procesos.component';
import { ValoresComponent } from './pages/principal/valores/valores.component';
import { ReportesComponent } from './pages/principal/reportes/reportes.component';

import { ScrollingDirective } from './directives/scrolling.directive';
import { DataComponent } from './components/data/data.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { SharedModule } from '../shared/shared.module';
import { ResumenComponent } from './pages/principal/resumen/resumen.component';
import { DinamicsComponent } from './pages/dinamics/dinamics.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProcesosComponent,
    ValoresComponent,
    ReportesComponent,
    ScrollingDirective,
    DataComponent,
    ResumenComponent,
    DinamicsComponent,
  ],
  imports: [CommonModule, LpmRoutingModule, NgPrimeModule, SharedModule],
})
export class LpmModule {}
