import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesPageComponent } from './cities-page/cities-page.component';

const routes: Routes = [
  {
    path: '',
    component: CitiesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }