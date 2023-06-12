import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'workorders',
    component: HomeComponent,
    loadChildren: () => import('./workorders/workorders.module').then(m => m.WorkordersModule),
  },
  {
    path: 'brands',
    component: HomeComponent,
    loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
