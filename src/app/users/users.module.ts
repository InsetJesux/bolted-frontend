import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';


@NgModule({
  declarations: [UsersPageComponent, UsersTableComponent, UserDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class UsersModule { }
