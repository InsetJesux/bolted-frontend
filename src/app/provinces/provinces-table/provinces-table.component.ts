import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IProvince } from '../interfaces/province.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModelsService } from 'src/app/models/models.service';
import { ProvinceDialogComponent } from '../province-dialog/province-dialog.component';
import { ProvincesService } from '../provinces.service';

@Component({
  selector: 'bolted-provinces-table',
  templateUrl: './provinces-table.component.html',
  styleUrls: ['./provinces-table.component.scss'],
})
export class ProvincesTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IProvince[] = [];
  selectedItems: IProvince[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly provincesService: ProvincesService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.provincesService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IProvince){
    this.ref = this.dialogService.open(ProvinceDialogComponent, {
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
