import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    PrimeNgModule
  ]
})
export class AuthenticationModule { }
