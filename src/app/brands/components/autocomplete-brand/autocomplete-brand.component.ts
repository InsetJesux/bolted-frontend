import { Component, Input, OnInit } from '@angular/core';
import { IBrand } from '../../interfaces/brand.interface';
import { BrandsService } from '../../brands.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'bolted-autocomplete-brand',
  templateUrl: './autocomplete-brand.component.html',
  styleUrls: ['./autocomplete-brand.component.scss'],
})
export class AutocompleteBrandComponent implements OnInit {
  @Input()
  fromControl!: FormControl;

  brands: IBrand[] = [];
  filteredBrands!: any[];

  constructor(private readonly brandsService: BrandsService) {}

  ngOnInit() {
    this.brandsService.getAll().subscribe((data) => {
      this.brands = data;
    });
  }

  filterBrand(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.brands as IBrand[]).length; i++) {
      let brand = (this.brands as IBrand[])[i];
      if (brand.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(brand);
      }
    }

    this.filteredBrands = filtered;
  }
}
