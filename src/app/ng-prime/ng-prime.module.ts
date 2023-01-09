import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';

import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ScrollPanelModule } from 'primeng/scrollpanel';



@NgModule({
  declarations: [],
  imports: [
    MenubarModule,
    ImageModule,
    TimelineModule,
    CardModule,
    ButtonModule
  ],
  exports: [
    MenubarModule,
    ImageModule,
    TimelineModule,
    CardModule,
    ButtonModule

  ]
})
export class NgPrimeModule { }
