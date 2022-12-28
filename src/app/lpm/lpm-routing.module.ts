import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaltasComponent } from './pages/asistencia/faltas/faltas.component';
import { LicenciasComponent } from './pages/asistencia/licencias/licencias.component';
import { TardanzasComponent } from './pages/asistencia/tardanzas/tardanzas.component';
import { VacacionesComponent } from './pages/asistencia/vacaciones/vacaciones.component';

import { CtsComponent } from './pages/especiales/cts/cts.component';
import { GratificacionComponent } from './pages/especiales/gratificacion/gratificacion.component';
import { RentaeComponent } from './pages/especiales/rentae/rentae.component';

import { HomeComponent } from './pages/home/home.component';

import { CesesComponent } from './pages/personal/ceses/ceses.component';
import { IngresarComponent } from './pages/personal/ingresar/ingresar.component';
import { ModificarComponent } from './pages/personal/modificar/modificar.component';

import { ProcesosComponent } from './pages/principal/procesos/procesos.component';
import { ReportesComponent } from './pages/principal/reportes/reportes.component';
import { ResumenComponent } from './pages/principal/resumen/resumen.component';
import { ValoresComponent } from './pages/principal/valores/valores.component';

import { AdelantosComponent } from './pages/registro/adelantos/adelantos.component';
import { ConceptosComponent } from './pages/registro/conceptos/conceptos.component';
import { HorextComponent } from './pages/registro/horext/horext.component';
import { IngresosComponent } from './pages/registro/ingresos/ingresos.component';
import { RentaComponent } from './pages/registro/renta/renta.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [

      { path: "principal/resumen", component: ResumenComponent },

      { path: "principal/procesos", component: ProcesosComponent },
      { path: "principal/reportes", component: ReportesComponent },
      { path: "principal/valores", component: ValoresComponent },

      { path: "asistencias/faltas", component: FaltasComponent },
      { path: "asistencias/licencias", component: LicenciasComponent },
      { path: "asistencias/tardanzas", component: TardanzasComponent },
      { path: "asistencias/vacaciones", component: VacacionesComponent },

      { path: "especiales/cts", component: CtsComponent },
      { path: "especiales/gratificacion", component: GratificacionComponent },
      { path: "especiales/rentaExterna", component: RentaeComponent },

      { path: "mantenimientoPersonal/ceses", component: CesesComponent },
      { path: "mantenimientoPersonal/ingresar", component: IngresarComponent },
      { path: "mantenimientoPersonal/modificar", component: ModificarComponent },

      { path: "registros/adelantos", component: AdelantosComponent },
      { path: "registros/horasExtras", component: HorextComponent },
      { path: "registros/otrosConceptos", component: ConceptosComponent },
      { path: "registros/otrosIngresos", component: IngresosComponent },
      { path: "registros/reporteRenta", component: RentaComponent },

      { path: "**", redirectTo: "principal/resumen" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LpmRoutingModule { }
