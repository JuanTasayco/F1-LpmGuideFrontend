import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LpmRoutingModule } from './lpm-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { FaltasComponent } from './pages/asistencia/faltas/faltas.component';
import { LicenciasComponent } from './pages/asistencia/licencias/licencias.component';
import { TardanzasComponent } from './pages/asistencia/tardanzas/tardanzas.component';
import { VacacionesComponent } from './pages/asistencia/vacaciones/vacaciones.component';

import { CtsComponent } from './pages/especiales/cts/cts.component';
import { GratificacionComponent } from './pages/especiales/gratificacion/gratificacion.component';
import { RentaeComponent } from './pages/especiales/rentae/rentae.component';

import { ProcesosComponent } from './pages/principal/procesos/procesos.component';
import { ValoresComponent } from './pages/principal/valores/valores.component';
import { ReportesComponent } from './pages/principal/reportes/reportes.component';

import { CesesComponent } from './pages/personal/ceses/ceses.component';
import { IngresarComponent } from './pages/personal/ingresar/ingresar.component';
import { ModificarComponent } from './pages/personal/modificar/modificar.component';

import { AdelantosComponent } from './pages/registro/adelantos/adelantos.component';
import { ConceptosComponent } from './pages/registro/conceptos/conceptos.component';
import { HorextComponent } from './pages/registro/horext/horext.component';
import { IngresosComponent } from './pages/registro/ingresos/ingresos.component';
import { RentaComponent } from './pages/registro/renta/renta.component';
import { ScrollingDirective } from './directives/scrolling.directive';
import { DataComponent } from './components/data/data.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { SharedModule } from '../shared/shared.module';
import { ResumenComponent } from './pages/principal/resumen/resumen.component';
import { KeyValuesPipe } from './pipes/key-values.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    FaltasComponent,
    LicenciasComponent,
    TardanzasComponent,
    VacacionesComponent,
    CtsComponent,
    GratificacionComponent,
    RentaeComponent,
    CesesComponent,
    IngresarComponent,
    ModificarComponent,
    ProcesosComponent,
    ValoresComponent,
    ReportesComponent,
    AdelantosComponent,
    ConceptosComponent,
    HorextComponent,
    IngresosComponent,
    RentaComponent,
    ScrollingDirective,
    DataComponent,
    ResumenComponent

  ],
  imports: [
    CommonModule,
    LpmRoutingModule,
    NgPrimeModule,
    SharedModule
  ]
})
export class LpmModule { }
