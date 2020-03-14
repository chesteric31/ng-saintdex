import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { RoleGuardService } from './security/role-guard.service';
import { AuthService } from './security/auth.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('app/saintseiya/saint-seiya.module').then(m => m.SaintSeiyaModule)
  },
  {
    path: 'about',
    loadChildren: () => import('app/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuardService],
    data: { role: 'ADMIN' }
  },
  {
    path: 'login',
    loadChildren: () => import('app/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [RoleGuardService, AuthService]
})
export class AppRoutingModule {}
