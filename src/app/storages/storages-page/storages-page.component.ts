import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StoragesTableComponent } from '../storages-table/storages-table.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StorageDialogComponent } from '../storage-dialog/storage-dialog.component';

@Component({
  selector: 'bolted-storages-page',
  templateUrl: './storages-page.component.html',
  styleUrls: ['./storages-page.component.scss'],
})
export class StoragesPageComponent  implements OnInit {
  @ViewChild('table')
  table!: StoragesTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(StorageDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
