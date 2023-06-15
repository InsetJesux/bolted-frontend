import { Component, Input, OnInit } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IModel } from '../../interfaces/model.interface';
import { FormControl } from '@angular/forms';
import { ModelsService } from '../../models.service';

@Component({
  selector: 'bolted-autocomplete-model',
  templateUrl: './autocomplete-model.component.html',
  styleUrls: ['./autocomplete-model.component.scss'],
})
export class AutocompleteModelComponent  implements OnInit {
  @Input()
  formControl!: FormControl;

  items: IModel[] = [];
  filteredItems!: any[];

  constructor(private readonly modelsService: ModelsService) {}

  ngOnInit() {
    this.modelsService.getAll().subscribe((data) => {
      this.items = data;
    });
  }

  filter(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as IModel[]).length; i++) {
      let user = (this.items as IModel[])[i];
      if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredItems = filtered;
  }
}
