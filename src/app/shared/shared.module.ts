import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { KeyValuesPipe } from '../lpm/pipes/key-values.pipe';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ErrorComponent,
    NavbarComponent,
    SidenavComponent,
    KeyValuesPipe,
    SearchComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
  ]
})
export class SharedModule { }
