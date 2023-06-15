import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandsService } from '../brands.service';
import { IBrand } from '../interfaces/brand.interface';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';

@Component({
  selector: 'bolted-brands-table',
  templateUrl: './brands-table.component.html',
  styleUrls: ['./brands-table.component.scss'],
  providers: [DialogService],
})
export class BrandsTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IBrand[] = [];
  selectedItems: IBrand[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly brandsService: BrandsService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.brandsService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IBrand){
    this.ref = this.dialogService.open(BrandDialogComponent, {
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
