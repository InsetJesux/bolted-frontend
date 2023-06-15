import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkordersPageComponent } from './workorders-page/workorders-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkordersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkordersRoutingModule { }
