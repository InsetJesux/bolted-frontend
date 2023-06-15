import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IModel } from '../interfaces/model.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandsService } from 'src/app/brands/brands.service';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';
import { ModelsService } from '../models.service';

@Component({
  selector: 'bolted-models-table',
  templateUrl: './models-table.component.html',
  styleUrls: ['./models-table.component.scss'],
})
export class ModelsTableComponent implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IModel[] = [];
  selectedItems: IModel[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly modelsService: ModelsService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.modelsService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IModel){
    this.ref = this.dialogService.open(ModelDialogComponent, {
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
