import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersTableComponent } from '../users-table/users-table.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'bolted-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent  implements OnInit {
  @ViewChild('table')
  table!: UsersTableComponent;

  items!: MenuItem[];
  dialogRef!: DynamicDialogRef;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      { label: 'Crear', icon: 'pi pi-fw pi-plus', command: () => this.openCreateDialog() },
    ];
  }

  openCreateDialog() {
    this.dialogRef = this.dialogService.open(UserDialogComponent,{});

    this.dialogRef.onClose.subscribe(() => {
      this.table.getItems();
    })
  }
}
