import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelsPageComponent } from './models-page/models-page.component';

const routes: Routes = [
  {
    path: '',
    component: ModelsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
