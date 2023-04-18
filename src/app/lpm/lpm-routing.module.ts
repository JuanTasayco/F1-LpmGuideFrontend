import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DinamicsComponent } from './pages/dinamics/dinamics.component';

import { HomeComponent } from './pages/home/home.component';

import { ProcesosComponent } from './pages/principal/procesos/procesos.component';
import { ReportesComponent } from './pages/principal/reportes/reportes.component';
import { ResumenComponent } from './pages/principal/resumen/resumen.component';
import { ValoresComponent } from './pages/principal/valores/valores.component';
import { ComplementsRouteGuard } from './guards/complements-route.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'principal/resumen', component: ResumenComponent },
      { path: 'principal/procesos', component: ProcesosComponent },
      { path: 'principal/reportes', component: ReportesComponent },
      { path: 'principal/valores', component: ValoresComponent },
      {
        path: ':section/:title',
        component: DinamicsComponent,
        canActivate: [ComplementsRouteGuard],
      },
      { path: '**', redirectTo: 'principal/valores' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LpmRoutingModule {}
