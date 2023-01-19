import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "editar/:id",
        component: AgregarComponent
      },
      {
        path: "agregar",
        component: AgregarComponent
      },
      {
        path: "**",
        redirectTo: "agregar"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
