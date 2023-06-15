import { Component, OnInit, ViewChild } from '@angular/core';
import { IWorkorder } from '../interfaces/workorder.interface';
import { Table } from 'primeng/table';
import { WorkordersService } from '../workorders.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkorderDialogComponent } from '../workorder-dialog/workorder-dialog.component';
import { MenuItem } from 'primeng/api';
import { WorkordersTableComponent } from '../workorders-table/workorders-table.component';

@Component({
  selector: 'bolted-workorders-page',
  templateUrl: './workorders-page.component.html',
  styleUrls: ['./workorders-page.component.scss'],
})
export class WorkordersPageComponent  implements OnInit {
  @ViewChild('table')
  table!: WorkordersTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(WorkorderDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
