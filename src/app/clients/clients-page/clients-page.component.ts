import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsTableComponent } from '../clients-table/clients-table.component';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

@Component({
  selector: 'bolted-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
})
export class ClientsPageComponent  implements OnInit {
  @ViewChild('table')
  table!: ClientsTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(ClientDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
