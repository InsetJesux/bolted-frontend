import { Component, Input, OnInit } from '@angular/core';
import { IProvince } from '../../interfaces/province.interface';
import { FormControl } from '@angular/forms';
import { ProvincesService } from '../../provinces.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'bolted-autocomplete-province',
  templateUrl: './autocomplete-province.component.html',
  styleUrls: ['./autocomplete-province.component.scss'],
})
export class AutocompleteProvinceComponent  implements OnInit {
  @Input()
  fromControl!: FormControl;

  items: IProvince[] = [];
  filteredBrands!: any[];

  constructor(private readonly provincesService: ProvincesService) {}

  ngOnInit() {
    this.provincesService.getAll().subscribe((data) => {
      this.items = data;
    });
  }

  filterBrand(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as IProvince[]).length; i++) {
      let brand = (this.items as IProvince[])[i];
      if (brand.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(brand);
      }
    }

    this.filteredBrands = filtered;
  }
}
