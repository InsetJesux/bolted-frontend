import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IUser } from '../interfaces/user.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../users.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserRole } from '../enums/user-role.enum';

@Component({
  selector: 'bolted-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent  implements OnInit {
  @ViewChild('dt')
  dt!: Table;

  items: IUser[] = [];
  selectedItems: IUser[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private readonly usersService: UsersService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.usersService.getAll().subscribe({
      next: (data) => {
          this.items = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  openEditDialog(model: IUser){
    this.ref = this.dialogService.open(UserDialogComponent, {
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

  getRoleName(role: UserRole) {
    return UserRole[role];
  }
}
