import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './auth/guards/auth-login.guard';

const routes: Routes = [
  {
    path: 'lpm',
    loadChildren: () => import('./lpm/lpm.module').then((m) => m.LpmModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthLoginGuard],
    canActivate: [AuthLoginGuard],
  },
  {
    path: '**',
    redirectTo: 'lpm',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
