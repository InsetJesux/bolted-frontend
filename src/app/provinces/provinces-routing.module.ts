import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvincesPageComponent } from './provinces-page/provinces-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProvincesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvincesRoutingModule { }
