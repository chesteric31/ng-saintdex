import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {CommonModule} from "@angular/common";
import {SaintSeiyaService} from "../saintseiya/list/saint-seiya.service";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: AdminComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule
    ],
  declarations: [
    AdminComponent
  ],
  providers: [
    SaintSeiyaService
  ]
})
export class AdminModule {
}
