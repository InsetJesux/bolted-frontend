import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IUser } from '../../interfaces/user.interface';
import { UsersService } from '../../users.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'bolted-autocomplete-user',
  templateUrl: './autocomplete-user.component.html',
  styleUrls: ['./autocomplete-user.component.scss'],
})
export class AutocompleteUserComponent  implements OnInit {
  @Input()
  formControl!: FormControl;

  items: IUser[] = [];
  filteredItems!: any[];

  constructor(private readonly usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAll().subscribe((data) => {
      this.items = data;
    });
  }

  filterCity(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as IUser[]).length; i++) {
      let user = (this.items as IUser[])[i];
      if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredItems = filtered;
  }
}
