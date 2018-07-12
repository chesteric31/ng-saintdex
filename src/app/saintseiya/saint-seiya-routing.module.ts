import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'saintseiya', pathMatch: 'full' },
  {
    path: 'saintseiya', component: ListComponent, children: [
      { path: ':id', component: DetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaintSeiyaRoutingModule { }
