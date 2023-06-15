import { Component, Input, OnInit } from '@angular/core';
import { ICity } from '../../interfaces/city.interface';
import { FormControl } from '@angular/forms';
import { CitiesService } from '../../cities.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'bolted-autocomplete-city',
  templateUrl: './autocomplete-city.component.html',
  styleUrls: ['./autocomplete-city.component.scss'],
})
export class AutocompleteCityComponent  implements OnInit {
  @Input()
  fromControl!: FormControl;

  cities: ICity[] = [];
  filteredCities!: any[];

  constructor(private readonly citiesService: CitiesService) {}

  ngOnInit() {
    this.citiesService.getAll().subscribe((data) => {
      this.cities = data;
    });
  }

  filterCity(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.cities as ICity[]).length; i++) {
      let city = (this.cities as ICity[])[i];
      if (city.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(city);
      }
    }

    this.filteredCities = filtered;
  }
}
