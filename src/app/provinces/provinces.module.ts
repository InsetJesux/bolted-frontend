import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvincesRoutingModule } from './provinces-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProvincesPageComponent } from './provinces-page/provinces-page.component';
import { ProvincesTableComponent } from './provinces-table/provinces-table.component';
import { ProvinceDialogComponent } from './province-dialog/province-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { AutocompleteProvinceComponent } from './components/autocomplete-province/autocomplete-province.component';


@NgModule({
    declarations: [ProvincesPageComponent, ProvincesTableComponent, ProvinceDialogComponent, AutocompleteProvinceComponent],
    imports: [
        CommonModule,
        ProvincesRoutingModule,
        PrimeNgModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [AutocompleteProvinceComponent]
})
export class ProvincesModule { }
