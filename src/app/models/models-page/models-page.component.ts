import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';
import { ModelsTableComponent } from '../models-table/models-table.component';

@Component({
  selector: 'bolted-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent  implements OnInit {
  @ViewChild('table')
  table!: ModelsTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(ModelDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
