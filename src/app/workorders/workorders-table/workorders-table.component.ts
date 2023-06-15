import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWorkorderFormGroup } from '../interfaces/workorder-form-group.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkordersService } from '../workorders.service';
import { MessageService } from 'primeng/api';
import { IClient } from 'src/app/clients/interfaces/client.interface';
import { IModel } from 'src/app/models/interfaces/model.interface';
import { Table } from 'primeng/table';
import { IWorkorder } from '../interfaces/workorder.interface';
import { WorkorderDialogComponent } from '../workorder-dialog/workorder-dialog.component';

@Component({
  selector: 'bolted-workorders-table',
  templateUrl: './workorders-table.component.html',
  styleUrls: ['./workorders-table.component.scss'],
})
export class WorkordersTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IWorkorder[] = [];
  selectedItems: IWorkorder[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly workordersService: WorkordersService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.workordersService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IWorkorder){
    this.ref = this.dialogService.open(WorkorderDialogComponent, {
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
