import { NgModule } from '@angular/core';

import { SaintSeiyaRoutingModule } from './saint-seiya-routing.module';
import { SharedModule } from './../common/shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    SharedModule,
    SaintSeiyaRoutingModule
  ],
  declarations: [
    ListComponent,
    DetailComponent
  ]
})
export class SaintSeiyaModule { }
