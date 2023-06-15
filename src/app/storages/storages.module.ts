import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoragesRoutingModule } from './storages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { StoragesPageComponent } from './storages-page/storages-page.component';
import { StoragesTableComponent } from './storages-table/storages-table.component';
import { StorageDialogComponent } from './storage-dialog/storage-dialog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [StoragesPageComponent, StoragesTableComponent, StorageDialogComponent],
  imports: [
    CommonModule,
    StoragesRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class StoragesModule { }
