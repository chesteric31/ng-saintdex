import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {RoleGuardService} from './security/role-guard.service';
import {AuthService} from './security/auth.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/saintseiya/saint-seiya.module#SaintSeiyaModule'
  },
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [RoleGuardService],
    data: { role: 'ADMIN'}
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [RoleGuardService, AuthService]
})
export class AppRoutingModule { }
