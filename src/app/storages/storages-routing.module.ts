import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoragesPageComponent } from './storages-page/storages-page.component';

const routes: Routes = [
  {
    path: '',
    component: StoragesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoragesRoutingModule { }
