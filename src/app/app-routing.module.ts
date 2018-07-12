import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: 'app/saintseiya/saint-seiya.module#SaintSeiyaModule' },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
