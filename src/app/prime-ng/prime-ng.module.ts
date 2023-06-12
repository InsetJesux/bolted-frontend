import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';

@NgModule({
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    StyleClassModule,
    ToastModule,
    MenuModule,
  ]
})
export class PrimeNgModule { }
