import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';

import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [],
  imports: [
    MenubarModule,
    ImageModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    AutoCompleteModule
  ],
  exports: [
    MenubarModule,
    ImageModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    AutoCompleteModule

  ]
})
export class NgPrimeModule { }
