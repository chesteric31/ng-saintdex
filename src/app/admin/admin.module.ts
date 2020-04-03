import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { SaintSeiyaService } from '../saintseiya/list/saint-seiya.service';
import { FormsModule } from '@angular/forms';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminArmorComponent } from './admin-armor/admin-armor.component';
import { SharedModule } from '../common/shared/shared.module';
import { AdminAddArmorComponent } from './admin-armor/admin-add-armor/admin-add-armor.component';
import { AdminEditArmorComponent } from './admin-armor/admin-edit-armor/admin-edit-armor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'armor-add', component: AdminAddArmorComponent },
      { path: 'armor-edit/:id', component: AdminEditArmorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, SharedModule],
  declarations: [AdminComponent, AdminCategoryComponent, AdminArmorComponent, AdminAddArmorComponent, AdminEditArmorComponent],
  providers: [SaintSeiyaService]
})
export class AdminModule {
}
