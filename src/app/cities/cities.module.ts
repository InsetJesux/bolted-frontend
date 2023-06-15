import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CitiesPageComponent } from './cities-page/cities-page.component';
import { CitiesTableComponent } from './cities-table/cities-table.component';
import { CityDialogComponent } from './city-dialog/city-dialog.component';
import { SharedModule } from "../shared/shared.module";
import { ProvincesModule } from '../provinces/provinces.module';
import { AutocompleteCityComponent } from './components/autocomplete-city/autocomplete-city.component';


@NgModule({
    declarations: [CitiesPageComponent, CitiesTableComponent, CityDialogComponent, AutocompleteCityComponent],
    imports: [
        CommonModule,
        CitiesRoutingModule,
        ReactiveFormsModule,
        PrimeNgModule,
        SharedModule,
        ProvincesModule,
    ],
    exports: [AutocompleteCityComponent]
})
export class CitiesModule { }
