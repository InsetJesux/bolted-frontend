import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IClient } from '../../interfaces/client.interface';
import { ClientsService } from '../../clients.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'bolted-autocomplete-client',
  templateUrl: './autocomplete-client.component.html',
  styleUrls: ['./autocomplete-client.component.scss'],
})
export class AutocompleteClientComponent  implements OnInit {
  @Input()
  formControl!: FormControl;

  items: IClient[] = [];
  filteredItems!: any[];

  constructor(private readonly clientsService: ClientsService) {}

  ngOnInit() {
    this.clientsService.getAll().subscribe((data) => {
      this.items = data;
    });
  }

  filter(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as IClient[]).length; i++) {
      let user = (this.items as IClient[])[i];
      if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredItems = filtered;
  }
}
