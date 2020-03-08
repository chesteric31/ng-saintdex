import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {CommonModule} from "@angular/common";
import {SaintSeiyaService} from "../saintseiya/list/saint-seiya.service";
import {FormsModule} from "@angular/forms";
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminArmorComponent } from './admin-armor/admin-armor.component';
import {SharedModule} from "../common/shared/shared.module";

const routes: Routes = [
  {path: '', component: AdminComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule
    ],
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminArmorComponent
  ],
  providers: [
    SaintSeiyaService
  ]
})
export class AdminModule {
}
