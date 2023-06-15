import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
import { BrandsTableComponent } from '../brands-table/brands-table.component';

@Component({
  selector: 'bolted-brands-page',
  templateUrl: './brands-page.component.html',
  styleUrls: ['./brands-page.component.scss'],
  providers: [DialogService],
})
export class BrandsPageComponent implements OnInit {
  @ViewChild('table')
  table!: BrandsTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(BrandDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
