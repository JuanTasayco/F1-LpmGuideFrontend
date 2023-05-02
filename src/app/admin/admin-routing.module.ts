import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar-section/agregar.component';
import { AgregarUserComponent } from './pages/agregar-user/agregar-user.component';
import { HomeComponent } from './pages/home/home.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'editar/:id',
        component: AgregarComponent,
      },

      {
        path: 'agregar',
        component: AgregarComponent,
      },

      {
        path: 'usuarios',
        component: AgregarUserComponent,
      },

      {
        path: 'usuarios/:id',
        component: EditarUsuarioComponent,
      },

      {
        path: '**',
        redirectTo: 'usuarios',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
