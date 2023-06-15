import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageDialogComponent } from '../storage-dialog/storage-dialog.component';
import { IStorage } from '../interfaces/storage.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { StoragesService } from '../storages.service';

@Component({
  selector: 'bolted-storages-table',
  templateUrl: './storages-table.component.html',
  styleUrls: ['./storages-table.component.scss'],
})
export class StoragesTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IStorage[] = [];
  selectedItems: IStorage[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly storagesService: StoragesService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.storagesService.getAll().subscribe({
      next: (items) => {
          this.items = items;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IStorage){
    this.ref = this.dialogService.open(StorageDialogComponent, {
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
