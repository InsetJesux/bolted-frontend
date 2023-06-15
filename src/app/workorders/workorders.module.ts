import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkordersRoutingModule } from './workorders-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { WorkordersPageComponent } from './workorders-page/workorders-page.component';
import { WorkordersTableComponent } from './workorders-table/workorders-table.component';
import { WorkorderDialogComponent } from './workorder-dialog/workorder-dialog.component';
import { ClientsModule } from '../clients/clients.module';
import { ModelsModule } from '../models/models.module';


@NgModule({
  declarations: [WorkordersPageComponent, WorkordersTableComponent, WorkorderDialogComponent],
  imports: [
    CommonModule,
    WorkordersRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule,
    ClientsModule,
    ModelsModule,
  ]
})
export class WorkordersModule { }
