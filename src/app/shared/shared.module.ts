import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { HomeComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  declarations: [HomeComponent, MenuComponent],
  exports: [HomeComponent, MenuComponent]
})
export class SharedModule { }
