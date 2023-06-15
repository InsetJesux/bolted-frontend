import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { IClient } from '../interfaces/client.interface';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'bolted-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IClient[] = [];
  selectedItems: IClient[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.clientsService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IClient){
    this.ref = this.dialogService.open(ClientDialogComponent, {
      data: {
        model: model,
      }
    });

    this.ref.onClose.subscribe(() => {
      this.getItems();
    })
  }

  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
