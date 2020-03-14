import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './../common/shared/shared.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule
    //HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'})
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
