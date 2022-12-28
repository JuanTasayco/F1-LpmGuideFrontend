import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "lpm",
    loadChildren: () => import("./lpm/lpm.module").then(m => m.LpmModule)
  },
  {
    path: "**",
    redirectTo: "lpm"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
