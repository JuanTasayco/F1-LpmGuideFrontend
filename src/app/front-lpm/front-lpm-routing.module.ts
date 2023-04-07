import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDesignComponent } from './pages/home-design/home-design.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDesignComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontLpmRoutingModule {}
