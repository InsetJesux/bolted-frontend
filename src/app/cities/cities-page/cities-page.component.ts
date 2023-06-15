import { Component, OnInit, ViewChild } from '@angular/core';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { CitiesTableComponent } from '../cities-table/cities-table.component';

@Component({
  selector: 'bolted-cities-page',
  templateUrl: './cities-page.component.html',
  styleUrls: ['./cities-page.component.scss'],
})
export class CitiesPageComponent  implements OnInit {
  @ViewChild('table')
  table!: CitiesTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(CityDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
