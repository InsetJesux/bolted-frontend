import { Component, OnInit, ViewChild } from '@angular/core';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';
import { ICity } from '../interfaces/city.interface';
import { CitiesService } from '../cities.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

@Component({
  selector: 'bolted-cities-table',
  templateUrl: './cities-table.component.html',
  styleUrls: ['./cities-table.component.scss'],
})
export class CitiesTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: ICity[] = [];
  selectedItems: ICity[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly citiesService: CitiesService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.citiesService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: ICity){
    this.ref = this.dialogService.open(CityDialogComponent, {
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
