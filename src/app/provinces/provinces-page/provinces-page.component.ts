import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProvinceDialogComponent } from '../province-dialog/province-dialog.component';
import { ProvincesTableComponent } from '../provinces-table/provinces-table.component';

@Component({
  selector: 'bolted-provinces-page',
  templateUrl: './provinces-page.component.html',
  styleUrls: ['./provinces-page.component.scss'],
})
export class ProvincesPageComponent  implements OnInit {
  @ViewChild('table')
  table!: ProvincesTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(ProvinceDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
